import React, { Component} from 'react';
import { Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import commomStyles from '../commomStyles';

import DateTimePicker from '@react-native-community/datetimepicker'

const initialSate = { 
    desc: '', 
    date: new Date(),
    showDatePicker: false,

}

import moment from 'moment';

export default class AddTask extends Component {
    
    state = { 
        ...initialSate
    }

    save = () => {
        const newTask = {
            desc: this.state.desc,
            date: this.state.date,
        }

        this.props.onSave && this.props.onSave(newTask)
        this.setState({...initialSate})
        
    }

    getDatePicker = () => {
        let datePicker = <DateTimePicker value={this.state.date}
            onChange={(_, date) => this.setState({date, showDatePicker: false})}
            mode='date' />

        const dateString = moment(this.state.date).format('ddd, D [de] MMM [de] YYYY')

            if(Platform.OS ==="android") {
                datePicker = (
                    <View>
                        <TouchableOpacity onPress={() => this.setState({ showDatePicker: true})}>
                            <Text style={styles.date}>
                                {dateString}
                            </Text>
                        </TouchableOpacity>
                        {this.state.showDatePicker && datePicker}
                    </View>
                )
            }
        return datePicker
        
    }



    render () {
        return (
            <Modal transparent={true} visible={this.props.isVisible}
                onResquestClose={this.props.onCancel}
                animationType='slide'>
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>   
                <View style={styles.container}>
                    <Text style={styles.header}>Nova Tarefa</Text>

                    <TextInput style={styles.input}
                        placeholder='Informe a Descrição...'
                        onChangeText={desc => this.setState({desc})}
                        value={this.state.desc}  />
                       {this.getDatePicker()}

                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>  
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.save}>
                            <Text style={styles.button}>Salvar</Text>  
                        </TouchableOpacity>
                    </View>
                </View>           
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    container: {
        
        backgroundColor: '#FFF'
    },
    header: {
       fontFamily: commomStyles.fontFamily,
       backgroundColor: commomStyles.colors.today, 
       color: commomStyles.colors.secondary,
       textAlign: 'center',
       padding: 15,
       fontSize: 15,
    },
    input: {
        fontFamily: commomStyles.fontFamily,
        height: 40,
        margin: 15,
        marginLeft: 10,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 6
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
   button: {
    margin: 20,
    marginRight: 30,
    color: commomStyles.colors.today,
   },
   date: {
    fontFamily: commomStyles.fontFamily,
    fontSize: 20,
    marginLeft: 15,
   }
})