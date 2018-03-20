import React, { Component } from 'react';
import { Text, View, StyleSheet  } from 'react-native';
import { Icon } from 'react-native-elements';
import MapsService from '../../Services/MapsService';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Modal from 'react-native-modal';

import { Styles, Colors } from '../../config/AppTheme';
import { NormalText, SubHeadingText, AccentButton, NormalInput, NumericInput } from '../UtilComponents';

const mapStyles = StyleSheet.create({
    map: {
      ...StyleSheet.absoluteFillObject
    },
   
  });

export default class SchoolLocation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            validatedAddressString: null,
            addStreet: null,
            addCity: null,
            addState: null,
            addZip: null,
            addressLatitude: 37.78825,
            addressLongitude: -122.4324,
            changeAddressModalVisible: false
        };
    }

    componentWillUnmount() {
        this.setState({
            changeAddressModalVisible: false
        });
    }

   _handleStreetAddressChanged = (input) => {
        this.setState({
            addStreet: input
        });
    }

    _handleStateAddressChanged = (input) => {
        this.setState({
            addState: input
        });
    }

    _handleCityAddressChanged = (input) => {
        this.setState({
            addCity: input
        });
    }

    _handleZipAddressChanged = (input) => {
        this.setState({
            addZip: input
        });
    }

    _handleUpdateAddressClick = () => {
        this.setState({
            changeAddressModalVisible: true
        });
    }

    // TODO:
    _validateSchoolAddress = () => {

    }

    /**
     * Fetches the latitude and longitude of an address.
     * Returns a promise.
     */
    _getAddressCoordinates = () => {
        // console.log(
    }

    /**
     * Handles the update school address form submit.
     */
    _handleSubmitAddressChange = () => {
        MapsService.getLatLongFromAddress(this.state.addStreet, 
            this.state.addCity, this.state.addZip).then((res) => {
                if (res !== 'undefinded' && res.length < 1) {
                    alert('Address not found. Try again.');
                } else {
                    this.setState({
                        addressLatitude: res[0].geometry.location.lat,
                        addressLongitude: res[0].geometry.location.lng,
                        validatedAddressString: res[0].formatted_address
                    })
                }
            }).catch((err) => {
                alert("An Error occurred.");
            });
        this.setState({
            changeAddressModalVisible: false
        });
    }

    _renderAddressInfo = () => {
        if (this.state.validatedAddressString) {
            return (
                <View style={[{flex:2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
                    <View style={[{ flex: 1 }]}>
                        <NormalText style={Styles.textBold}>Address:</NormalText>
                        <NormalText>
                            {this.state.validatedAddressString}
                        </NormalText>
                        <NormalText>No Address yet.</NormalText>
                    </View>
                    <View style={[{ flex: 1, alignItems: 'flex-end' }]}>
                        <Icon
                            raised
                            reverse
                            name='edit'
                            type='font-awesome'
                            color={Colors.black}
                            onPress={() => this._handleUpdateAddressClick()} />
                    </View>
                </View>
            );
        } else {
            return (
                <View style={[{flex:2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
                    <View style={[{ flex: 1 }]}>
                        <NormalText>No Address Yet.</NormalText>
                    </View>
                    <View style={[{ flex: 1, alignItems: 'flex-end' }]}>
                        <Icon
                            raised
                            reverse
                            name='plus'
                            type='font-awesome'
                            color={Colors.black}
                            onPress={() => this._handleUpdateAddressClick()} />
                    </View>
                </View>
            );
        }
    }

    render() {
        return (
            <View style={[Styles.mainContainer]}>
                <View style={[Styles.navbar]}>

                    <View style={[Styles.navbarLeft]}>
                        <Icon name="arrow-left" type="font-awesome"
                            color={Colors.headerTextIcons} />
                    </View>

                    <Text style={[Styles.pageTitle]}>School Location</Text>

                    <View style={Styles.navbarRight}>

                    </View>
                </View>


                <View style={[Styles.container]}>
                    <View style={[Styles.marginB]}>
                        {this._renderAddressInfo()}
                    </View>

                    <View style={[Styles.marignLRNone, Styles.marginT, { flex: 4, alignItems: 'stretch' }]}>
                        <MapView
                            scrollEnabled={false} zoomEnabled={false} style={mapStyles.map}
                            provider={PROVIDER_GOOGLE}
                            region={{
                                latitude: this.state.addressLatitude,
                                longitude: this.state.addressLongitude,
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.0121,
                            }}>
                            
                            <MapView.Marker draggable
                                coordinate={{
                                    latitude: this.state.addressLatitude,
                                    longitude: this.state.addressLongitude,
                                }}
                                title={"School Location"}
                                description={this.state.validatedAddressString}
                            />
                        </MapView>
                    </View>

                </View>

                <Modal isVisible={this.state.changeAddressModalVisible} style={Styles.bottomModal}>
                    <View style={Styles.modalContent}>
                        <SubHeadingText>Your School Address</SubHeadingText>
                        <NormalInput placeholder="Street" value={this.state.addStreet}
                            onChangeText={(text) => this._handleStreetAddressChanged(text)} />

                        <NormalInput placeholder="City" value={this.state.addCity}
                            onChangeText={(text) => this._handleCityAddressChanged(text)} />

                        <View style={[{ flexDirection: 'row' }, Styles.marginB]}>
                            <NormalInput placeholder="State" value={this.state.state} style={{ flex: 2 }}
                                onChangeText={(text) => this._handleStateAddressChanged(text)} />

                            <NumericInput placeholder="Zip" value={this.state.addZip} style={{ flex: 1 }}
                                onChangeText={(text) => this._handleZipAddressChanged(text)} />
                        </View>
                        <View>
                            <AccentButton text={this.state.validatedAddressString ? "Uodate" : "Add"} onPress={() => { this._handleSubmitAddressChange() }} />
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}