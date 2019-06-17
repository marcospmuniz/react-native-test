import React, { Component } from 'react';

import { View, Text } from 'react-native';

export default class Main extends Component {
    static navigationOptions = {
        title: "Nome do APP"
    }

    render() {
        return(
            <View>
                <Text>Página Main</Text>
            </View>
        );
    }
}