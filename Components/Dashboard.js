import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {Styles} from '../config/AppTheme'


export default class Dashboard extends Component {
    render() {
      return(
          <View style={[Styles.mainContainer, {backgroundColor: 'green'}]}>
            <ScrollView>
              <View style={[Styles.container, Styles.centerContents]}>
                <Text style={[Styles.textHeading]}>Congrats!</Text>
                <Text style={[Styles.textSubHeading]}>You've made it to the secured screen.</Text>
              </View>


               <View style={[Styles.marginTB]}>
                    <Button text="[Sign Out as Demo Teacher]" buttonStyle={[[Styles.btn, Styles.btnWarning]]} />
                </View>
            </ScrollView>
          </View>
      );
    }
  }