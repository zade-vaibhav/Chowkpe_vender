import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import Swiper from "react-native-swiper";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  format,
  addDays,
  isSameDay,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
} from "date-fns";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get("window");

const TaskListScreen = ({ carouselData = [], taskData = [] }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState(
    format(new Date(), "dd/MM/yy")
  );
  // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const navigation = useNavigation();

  const handleCreateTask = () => {
    navigation.navigate("Create Task");
  };

  // const showDatePicker = () => {
  //   setDatePickerVisibility(true);
  // };

  // const hideDatePicker = () => {
  //   setDatePickerVisibility(false);
  // };

  // const handleConfirm = (date) => {
  //   setSelectedDate(date);
  //   setSelectedDateStr(format(date, "dd/MM/yy"));
  //   hideDatePicker();
  // };

  const defaultCarouselData = [
    {
      image:
        "https://images.pexels.com/photos/439416/pexels-photo-439416.jpeg?cs=srgb&dl=pexels-sevenstormphotography-439416.jpg&fm=jpg",
      id: 1,
    },
    {
      image:
        "https://www.jkcement.com/wp-content/uploads/2023/09/plasterer-hand-rubber-glove-using-wooden-trowel-plastering-cement-brick-wall-background-1-scaled.jpg",
      id: 2,
    },
    {
      image:
        "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbnN0cnVjdGlvbnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
      id: 3,
    },
    {
      image:
        "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbnN0cnVjdGlvbnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
      id: 4,
    },
  ];

  const defaultTaskData = [
    {
      id: 1,
      title: "Forklift Operator",
      startDate: "24/03/23",
      endDate: "24/03/23",
      image: require("../../assets/Forklifter.png"),
      workStartingPeriod: "24/03/23 - 24/03/23",
      earningPerHour: "15 USD",
      category: ["Logistics", "Warehouse"],
      address: "123 Main St, City",
      documentationRequired: ["ID Proof", "License"],
      jobDescription: "Operate forklifts to load and unload materials.",
      accommodation: true,
      food: true,
      esi: true,
      pf: true,
    },
    {
      id: 2,
      title: "Cleaner",
      startDate: "24/03/23",
      endDate: "24/03/23",
      image: require("../../assets/cleaner.png"),
      workStartingPeriod: "24/03/23 - 24/03/23",
      earningPerHour: "10 USD",
      category: ["Cleaning"],
      address: "456 Another St, City",
      documentationRequired: ["ID Proof"],
      jobDescription: "Clean and maintain facilities.",
      accommodation: false,
      food: true,
      esi: false,
      pf: false,
    },
    {
      id: 3,
      title: "Forklift Operator",
      startDate: "24/03/23",
      endDate: "24/03/23",
      image: "https://via.placeholder.com/350x150",
      workStartingPeriod: "24/03/23 - 24/03/23",
      earningPerHour: "15 USD",
      category: ["Logistics", "Warehouse"],
      address: "789 Different St, City",
      documentationRequired: ["ID Proof", "License"],
      jobDescription: "Operate forklifts to load and unload materials.",
      accommodation: true,
      food: false,
      esi: true,
      pf: false,
    },
    {
      id: 4,
      title: "Painter",
      startDate: "19/07/24",
      endDate: "24/07/24",
      image: "https://via.placeholder.com/350x150",
      workStartingPeriod: "24/03/23 - 24/03/23",
      earningPerHour: "20 USD",
      category: ["Construction", "Maintenance"],
      address: "101 Paint St, City",
      documentationRequired: ["ID Proof"],
      jobDescription: "Paint interior and exterior surfaces.",
      accommodation: false,
      food: true,
      esi: false,
      pf: true,
    },
    {
      id: 5,
      title: "Electrician",
      startDate: "19/07/24",
      endDate: "30/07/24",
      image: "https://via.placeholder.com/350x150",
      workStartingPeriod: "24/03/23 - 24/03/23",
      earningPerHour: "25 USD",
      category: ["Maintenance", "Construction"],
      address: "202 Electric St, City",
      documentationRequired: ["ID Proof", "Certification"],
      jobDescription: "Install and repair electrical systems.",
      accommodation: true,
      food: true,
      esi: true,
      pf: true,
    },
    {
      id: 6,
      title: "Plumber",
      startDate: "24/03/23",
      endDate: "24/03/23",
      image: "https://via.placeholder.com/350x150",
      workStartingPeriod: "24/03/23 - 24/03/23",
      earningPerHour: "18 USD",
      category: ["Maintenance", "Construction"],
      address: "303 Plumbing St, City",
      documentationRequired: ["ID Proof", "Certification"],
      jobDescription: "Install and repair plumbing systems.",
      accommodation: false,
      food: true,
      esi: false,
      pf: true,
    },
  ];

  // const dates = Array.from({ length: 30 }, (_, i) => addDays(new Date(), i));

  const generateMonthDates = (date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    const dates = [];
    for (let day = start; day <= end; day = addDays(day, 1)) {
      dates.push(day);
    }
    return dates;
  };

  const [monthDates, setMonthDates] = useState(generateMonthDates(new Date()));

  const changeMonth = (date) => {
    setMonthDates(generateMonthDates(date));
    setSelectedDate(date);
    setSelectedDateStr(format(date, "dd/MM/yy"));
  };

  const filterTasksByDate = (tasks, dateStr) => {
    return tasks.filter((task) => task.startDate === dateStr);
  };

  const filteredTasks = useMemo(
    () =>
      filterTasksByDate(
        taskData.length ? taskData : defaultTaskData,
        selectedDateStr
      ),
    [selectedDateStr, taskData]
  );

  const renderDateItem = ({ item }) => {
    const dayOfWeek = format(item, "EEE");
    const dayOfMonth = format(item, "dd");
    const isSelected = isSameDay(item, selectedDate);
    return (
      <TouchableOpacity
        style={[styles.dateItem, isSelected && styles.selectedDateItem]}
        onPress={() => {
          setSelectedDate(item);
          setSelectedDateStr(format(item, "dd/MM/yy"));
        }}
      >
        <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>
          {dayOfWeek}
        </Text>
        <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>
          {dayOfMonth}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderTaskItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("TaskDetail", {
          data: item,
          screenName: "TaskList",
        })
      }
    >
      <View style={styles.card}>
        <LinearGradient
          colors={["#fff", "#e0f7fa"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.cardGradient}
        >
          <View style={styles.cardLeft}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDate}>Start Date: {item.startDate}</Text>
            <Text style={styles.cardDate}>End Date: {item.endDate}</Text>
          </View>
          <TouchableOpacity style={styles.cardRight} onPress={() => {}}>
            <Image
              source={
                typeof item.image === "string"
                  ? { uri: item.image }
                  : item.image
              }
              style={styles.cardImage}
            />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/chowkpe.png")}
          style={styles.logo}
        />
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={require("../../assets/Group298.png")}
              style={styles.notificationIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={require("../../assets/Ellipse.png")}
              style={styles.profileIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.cont}>
        <Swiper
          style={styles.carousel}
          showsButtons={false}
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
          autoplay
          autoplayTimeout={5}
          showsPagination={false}
        >
          {(carouselData.length ? carouselData : defaultCarouselData).map(
            (item) => (
              <View style={styles.slide} key={item.id}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.carouselImage}
                />
              </View>
            )
          )}
        </Swiper>
      </View>
      <View style={styles.calendarContainer}>
        <View style={styles.dateHeader}>
          <Text style={styles.dateLabel}>Date</Text>
          <View style={styles.dateSelector}>
            <TouchableOpacity
              onPress={() => changeMonth(subMonths(selectedDate, 1))}
            >
              <Icon
                name="chevron-left"
                size={20}
                color="#3B82F6"
                style={styles.icon}
              />
            </TouchableOpacity>
            <Text style={styles.monthYearText}>
              {format(selectedDate, "MMMM yyyy")}
            </Text>
            <TouchableOpacity
              onPress={() => changeMonth(addMonths(selectedDate, 1))}
            >
              <Icon
                name="chevron-right"
                size={20}
                color="#3B82F6"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={monthDates}
          renderItem={renderDateItem}
          keyExtractor={(item) => item.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={10}
          contentContainerStyle={styles.dateStyle}
        />
      </View>
      <FlatList
        data={filteredTasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.taskList}
        contentContainerStyle={styles.scrollContainer}
        ListEmptyComponent={
          <Text style={styles.noTaskText}>No tasks available</Text>
        }
      />

      <TouchableOpacity style={styles.fab} onPress={handleCreateTask}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
      {/* <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginTop: "7%",
  },
  logo: {
    height: 40,
    resizeMode: "contain",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationIcon: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
  profileIcon: {
    width: 35,
    height: 35,
    marginRight: 15,
    marginTop: "5%",
  },
  carousel: {
    height: "100%",
  },
  cont: {
    height: "28%",
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 8,
  },

  calendarContainer: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  dateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  dateSelector: {
    flexDirection: "row",
    alignItems: "center",
  },
  calendarIcon: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  dateLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: -8,
    marginBottom: 5,
    paddingHorizontal: 16,
  },
  dateItem: {
    width: 60,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#ddd",
    marginHorizontal: 5,
  },
  currentMonthYear: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  noTaskText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 16,
    color: "#999",
  },
  selectedDateItem: {
    backgroundColor: "#3B82F6",
  },
  dateText: {
    fontSize: 16,
  },
  selectedDateText: {
    color: "white",
  },
  taskList: {
    flex: 1,
  },
  dateStyle: {
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 15,
  },
  cardGradient: {
    flexDirection: "row",
    padding: 15,
  },
  cardLeft: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardDate: {
    fontSize: 14,
    color: "#555",
  },
  cardRight: {
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  cardImage: {
    width: "100%",
    height: 80,
    resizeMode: "cover",
    borderRadius: 8,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  icon: {
    marginHorizontal: 10,
  },
  fab: {
    position: "absolute",
    width: 60,
    height: 60,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    bottom: 20,
    right: 20,
    elevation: 5,
  },
  fabText: {
    fontSize: 36,
    color: "white",
  },
});

export default TaskListScreen;
