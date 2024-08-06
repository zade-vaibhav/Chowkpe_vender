import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ActivityIndicator,
  Switch,
  Pressable
} from "react-native";
import Swiper from "react-native-swiper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const TaskListScreen = ({ carouselData = [], taskData = [] }) => {
  const [mytask, setMyTask] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isRefresh, setIsRefresh] = useState(false);
  const [isChange, setIsChange] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState(
    format(new Date(), "dd/MM/yy")
  );
  // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const navigation = useNavigation();

  const handleCreateTask = () => {
    navigation.navigate("Create Task");
  };

  async function getMyTask() {
    setLoading(true)
    const token = await AsyncStorage.getItem("uid");
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      };
      const response = await fetch('https://chowkpe-server.onrender.com/api/v1/vender/allTask', requestOptions);
      const data = await response.json()
      if (data.success == true) {
        setLoading(false)
        setMyTask(data.tasks)
      } else {
        setLoading(false)
      }
    } catch (err) {
      Alert.alert(err.message);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      const fetchDataAsync = async () => {
        getMyTask()
      };

      fetchDataAsync();
    }, [isRefresh])
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsRefresh(!isRefresh);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getMyTask()
  }, [refresh])

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



  // formated date
  function formatDate(dateString) {
    return `${dateString.slice(8, 10)}/${dateString.slice(5, 7)}/${dateString.slice(2, 4)}`;
  }

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

  // giving task with filtered date
  const filterTasksByDate = (tasks, dateStr) => {
    return tasks.filter((task) => formatDate(task.createdAt) === dateStr);
  };

  // return tasks that contain selected date
  const filteredTasks = useMemo(() =>
    filterTasksByDate(
      taskData.length ? taskData : mytask,
      selectedDateStr
    ),
    [selectedDateStr, taskData]);

  const handleSwitchChange = () => {
    setIsChange(!isChange);
  };


  // render date 
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
    <Pressable
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
          <View style={styles.cardContent}>
            <View style={styles.cardLeft}>
              <View style={styles.infoRow}>
                <Text style={styles.cardLabel}>Work Start Period:</Text>
                <Text style={styles.cardValue}>{item.task.workStartingPeriod}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.cardLabel}>Category:</Text>
                <Text style={styles.cardValue}>{item.task.hireCategory[0]}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.cardLabel}>Location:</Text>
                <Text style={styles.cardValue}>{item.task.addressLocation}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.cardRight} onPress={() => { }}>
              <Image
                source={require("../../assets/images/skill/Vertical-Full.png")}
                style={styles.cardImage}
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </Pressable>
  );


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require("../../assets/chowkpe.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => { }}>
            <Image
              source={require("../../assets/Group298.png")}
              style={styles.notificationIcon}
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
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 10
      }}>
        <Text style={styles.text}>Sorted task</Text>
        <Switch value={isChange} onChange={() => handleSwitchChange()} />
        <Text style={styles.text}>All task</Text>
      </View>

      {
        isChange ? <View style={{ flex: 1 }}>
          <Text style={{ textAlign: "center", marginTop: 10, marginBottom: 20 }}>" Your All - Task "</Text>
          {
            loading ? <ActivityIndicator size="large" color="blue" /> : <FlatList
              data={mytask}
              renderItem={renderTaskItem}
              keyExtractor={(item) => item._id.toString()}
              style={styles.taskList}
              contentContainerStyle={styles.scrollContainer}
              ListEmptyComponent={
                <Text style={styles.noTaskText}>No tasks available</Text>
              }
            />
          }


          <TouchableOpacity style={styles.fab} onPress={handleCreateTask}>
            <Text style={styles.fabText}>+</Text>
          </TouchableOpacity>
        </View> : <View style={{ flex: 1 }}><View style={styles.calendarContainer}>
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
          {/* <View style={{ alignItems: 'flex-end' }}>
        <TouchableOpacity onPress={() => setRefresh(!refresh)}>
          <Image
            source={require("../../assets/images/skill/refresh.png")}
            style={styles.refreshImage}
          />
        </TouchableOpacity>
      </View> */}
          {
            loading ? <ActivityIndicator size="large" color="blue" /> : <FlatList
              data={filteredTasks}
              renderItem={renderTaskItem}
              keyExtractor={(item) => item._id.toString()}
              style={styles.taskList}
              contentContainerStyle={styles.scrollContainer}
              ListEmptyComponent={
                <Text style={styles.noTaskText}>No tasks available</Text>
              }
            />
          }

          <TouchableOpacity style={styles.fab} onPress={handleCreateTask}>
            <Text style={styles.fabText}>+</Text>
          </TouchableOpacity></View>
      }

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
    marginTop: 30,
    paddingHorizontal:20
  },
  headerLeft: {
    flex: 1,
    alignItems: "flex-start",
  },
  logo: {
    height: 30,
    width:70,
    resizeMode: "contain",
  },
  headerRight: {
    flex: 0,
    alignItems: "flex-end",
  },
  notificationIcon: {
    height: 28,
    width: 28,
    resizeMode: "contain",
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
  refreshImage: {
    width: 30,
    height: 20,
    marginRight: 20,
    marginBottom: 10,
    padding: 15,
    resizeMode: "contain",
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
  },
  cardLeft: {
    marginRight: 16,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    width: "90%",
    height: 90,
    resizeMode: "cover",
    borderRadius: 2,
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
  }, text: {
    fontSize: 16,
    marginHorizontal: 1,
    fontWeight: "600"
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: "white",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    marginBottom: 10,
  },
  cardGradient: {
    padding: 15,
    borderRadius: 10,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLeft: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginRight: 5,
  },
  cardValue: {
    fontSize: 14,
    color: '#666',
  },
  cardRight: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default TaskListScreen;
