import React, {Component} from 'react'
import {View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform} from 'react-native'

import commomStyles from '../commomStyles'
import todayImage from '../../assets/imgs/today.jpg'


import moment from 'moment'
import 'moment/locale/pt-br'

import Icon from 'react-native-vector-icons/FontAwesome'

import Task from '../components/Task'
import AddTask from './AddTask'


export default class TaskList extends Component {
    state ={ 
        showDoneTasks: true,
        showAddTask: true,
        visibleTasks: [],
        tasks: [
            {
                id: Math.random(),
                desc: 'Comprar Livro de React Native',
                estimateAt: new Date(),
                doneAt: new Date(),
            },
            {
                id: Math.random(),
                desc: 'Ler Livro',
                estimateAt: new Date(),
                doneAt: null,
            },
        ]
    }
    
    componentDidMount = () => {
        this.filterTasks()
    }

    toggleFilter = () => {
        this.setState({showDoneTasks: !this.state.showDoneTasks}, this.filterTasks) 
    }
    
    filterTasks = () => {
        let visibleTasks = null 
        if(this.state.showDoneTasks) {
            visibleTasks = [...this.state.tasks]
        } else {
            const pending = task => task.doneAt === null
            visibleTasks = this.state.tasks.filter(pending)
        }

        this.setState({ visibleTasks })
    }

    toggleTask = taskId => {
        const tasks = [...this.state.tasks]
        tasks.forEach(task => {
            if(task.id === taskId) {
                task.doneAt = task.doneAt ? null : new Date()
            }
        })

        this.setState({ tasks }, this.filterTasks)
    }

    render() {
        const today = moment().locale('pt-br').format('ddd, D [de] MMM')
        return (
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask}
                    onCancel={() => this.setState({showAddTask: false})}
                    />

                <ImageBackground source={todayImage}
                style={styles.background}>
                <View style={styles.IconBar}>
                    <TouchableOpacity onPress={this.toggleFilter}>
                       <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} size={20} color={commomStyles.colors.secondary} />
                    </TouchableOpacity>
                </View>
                <View style={styles.titleBar}>
                    <Text style={styles.title}>Hoje</Text>
                    <Text style={styles.subTitle}>{today}</Text>
                </View>
                </ImageBackground>
                <View style={styles.TaskList}>
                    <FlatList data={this.state.visibleTasks}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({item}) => <Task {...item} toggleTask={this.toggleTask} /> } />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 3,
    },
    TaskList: {
        flex: 7,
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',
    
    },
    title: {
        fontFamily: commomStyles.fontFamily,
        color: commomStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20,

    },
    subTitle: {
        fontFamily: commomStyles.fontFamily,
        color: commomStyles.colors.secondary,
        fontSize: 30,
        marginLeft: 20,
        marginBottom: 30,
    },
    IconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: Platform.Os === 'ios' ? 40 : 10,

    }

})