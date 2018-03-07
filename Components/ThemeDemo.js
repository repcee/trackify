import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Styles, Colors } from '../config/AppTheme';
import Constants from '../config/Constants'

// Demonstrates the styles in the AppThemes
export default class ThemeDemo extends Component {
  render() {
    return (
      <View style={[Styles.mainContainer]}>
        <View style={[Styles.navbar]}>
          <View style={[Styles.navbarLeft]}>
            <Icon name="arrow-left" type="font-awesome" color={Colors.headerTextIcons} />
          </View>

          <Text style={[Styles.pageTitle]}>Dashboard</Text>

          <View style={[Styles.navbarRight]}>
            <Icon name="cog" type="font-awesome" color={Colors.headerTextIcons} />
          </View>

        </View>

        <ScrollView>
          <View style={Styles.container}>

            <Text style={[Styles.textHeading]}>
              This is a heading
            </Text>

            <Text style={[Styles.textSubHeading]}>
              This is a subheading
            </Text>

            <Text style={Styles.textRegular}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
              {' '}
              <Text style={Styles.textBold}>
                This is bold text within a (regular text) paragraph
              </Text>
              .
            </Text>

            <Text style={[Styles.textHeading]}>Buttons</Text>

            <View style={[Styles.marginTSmall, Styles.horizontalContainer]}>
              <Button
                text="Button Small"
                buttonStyle={[Styles.btnSmall, Styles.btnPrimary, { flex: 1 }]}
              />

              <Button
                text="Button Small"
                buttonStyle={[Styles.btnSmall, Styles.btnAccent, { flex: 1 }]}
              />

              <Button
                text="Button Small"
                buttonStyle={[
                  Styles.btnSmall,
                  Styles.btnBlack,
                  { flex: 1 },
                  Styles.marginTSmall,
                ]}
              />
            </View>

            <View style={[Styles.marginTSmall]}>
              <Button
                disabled={true}
                text="Disabled Button"
                buttonStyle={[Styles.btn, { alignSelf: 'center' }]}
              />
            </View>

            <View style={[Styles.marginTSmall, { alignSelf: 'center' }]}>
              <Button
                text="Button Primary"
                buttonStyle={[Styles.btn, Styles.btnPrimary]}
              />
            </View>

            <View style={[Styles.marginTSmall, { alignSelf: 'center' }]}>
              <Button
                text="Button Accent"
                buttonStyle={[Styles.btn, Styles.btnAccent]}
              />
            </View>

            <View style={[Styles.marginTSmall, { alignSelf: 'center' }]}>
              <Button
                text="Button Positive"
                buttonStyle={[Styles.btn, Styles.btnPositive]}
              />
            </View>

            <View style={[Styles.marginTSmall, { alignSelf: 'center' }]}>
              <Button
                text="Button Warning"
                buttonStyle={[Styles.btn, Styles.btnWarning]}
              />
            </View>

            <View style={[Styles.marginTSmall, { alignSelf: 'center' }]}>
              <Button
                text="Button Negative"
                buttonStyle={[Styles.btn, Styles.btnNegative]}
              />
            </View>

            <View style={[Styles.marginTSmall, { alignSelf: 'center' }]}>
              <Button
                text="Button Black"
                buttonStyle={[Styles.btn, Styles.btnBlack]}
              />
            </View>

          </View>
        </ScrollView>
      </View>
    );
  }
}
