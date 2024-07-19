import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import FirstRoute from './FirstRoute'; // adjust the import path accordingly

const SecondRoute = () => (
    <View style={[styles.scene]}>
        <Text style={styles.contentText}>Second Tab Content</Text>
    </View>
);

const ThirdRoute = () => (
    <View style={[styles.scene]}>
        <Text style={styles.contentText}>Third Tab Content</Text>
    </View>
);

const initialLayout = { width: Dimensions.get('window').width };

const WorkersListScreen = () => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
        { key: 'third', title: 'Third' },
    ]);

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
    });

    return (
        <View style={styles.container}>
            {/* <Text style={styles.headerText}></Text> */}
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        indicatorStyle={styles.indicator}
                        style={styles.tabBar}
                        labelStyle={styles.tabLabel}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '10%',
    },
    scene: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 16,
        backgroundColor: '#e0e0e0',
    },
    tabBar: {
        backgroundColor: '#fff',
    },
    indicator: {
        backgroundColor: '#007BFF',
    },
    tabLabel: {
        color: '#000',
        fontWeight: '600',
    },
    contentText: {
        fontSize: 18,
        color: '#000',
    },
});

export default WorkersListScreen;
