import React, { Component } from 'react';
import { Text, View, StyleSheet, ActivityIndicator  } from 'react-native';
import { Icon } from 'react-native-elements';
import MapsService from '../../Services/MapsService';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Modal from 'react-native-modal';
import { NavigationActions } from 'react-navigation';

import { Styles, Colors } from '../../config/AppTheme';
import { NormalText, SubHeadingText, AccentButton, NormalInput, NumericInput, BlackButton } from '../UtilComponents';

const mapStyles = StyleSheet.create({
    map: {
      ...StyleSheet.absoluteFillObject
    },
   
  });

export default class SchoolLocation extends Component {
    constructor(props) {        
        super(props);
        const appState = {
            classAddressString,
            classLatitude,
            classLongitude
        } = this.props.navigation.getParam('appState');

        

        // Set the initial state of the screen.
        this.state = {
            changeAddressModalVisible: false,

            // Validated address from google's api
            classAddressString: appState.classAddressString,

            // TODO: Update to get the current lat and lng from user location
            classLatitude: appState.classLatitude,
            classLongitude:  appState.classLongitude,

            //Input address info
            inputAddrLine1: null,
            inputAddrCity: null,
            inputAddrState: null,
            inputAddrZip: null,

            isFetchingAddr: false,

        };
    }


    componentWillUnmount() {
        this.setState({
            changeAddressModalVisible: false
        });
    }

    /**
     * Updates the state whenever the value of the line 1 address input is changed.
     */
   _handleAddressLine1Changed = (input) => {
        this.setState({
            inputAddrLine1: input
        });
    }

    /**
     * Updates the state whenever the value of the state input is changed.
     */
    _handleStateAddressChanged = (input) => {
        this.setState({
            inputAddrState: input
        });
    }

    /**
     * Updates the state whenever the value of the city input is changed.
     */
    _handleCityAddressChanged = (input) => {
        this.setState({
            inputAddrCity: input
        });
    }

    /**
     * Updates the state whenever the value of the zipcode input is changed.
     */
    _handleZipAddressChanged = (input) => {
        this.setState({
            inputAddrZip: input
        });
    }

    /**
     * Opens the modal when the update/add address button is clicked.
     */
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

    _handleCancelAddressChange = () => {
        this.setState({
            changeAddressModalVisible: false,
            inputAddrLine1: null,
            inputAddrCity: null,
            inputAddrState: null,
            inputAddrZip: null
        });


    }

    _handleBackButtonClicked = () => {
        this.props.navigation.dispatch(
            NavigationActions.back({
                key: null
            })
        );
    }

    /**
     * Handles the update school address form submit.
     */
    _handleSubmitAddressChange = () => {
        this.setState({
            isFetchingAddr: true
        });

        MapsService.getLatLongFromAddress(this.state.inputAddrLine1, 
            this.state.inputAddrCity, this.state.inputAddrState, this.state.inputAddrZip).then((res) => {
                this.setState({
                    isFetchingAddr: false
                });

                if (res == 'undefinded' || res.length < 1) {
                    console.log(res);
                    alert('Address not found. Try again.');
                } else {
                    this.setState({
                        classLatitude: res[0].geometry.location.lat,
                        classLongitude: res[0].geometry.location.lng,
                        classAddressString: res[0].formatted_address,

                        changeAddressModalVisible: false,
                    });

                    // update return address
                    const _returnData = {
                        classAddressString: res[0].formatted_address,
                        classLatitude: res[0].geometry.location.lat,
                        classLongitude:  res[0].geometry.location.lng,
                    };


                    this.props.navigation.getParam('returnData')(_returnData);
                }
            }).catch((err) => {
                alert("An Error occurred.");
            });
       
    }

    _renderAddressInfo = () => {
        if (this.state.classAddressString) {
            return (
                <View style={[{flex:2, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}]}>
                    <View style={[{ flex: 1 }]}>
                        <NormalText style={Styles.textBold}>Address:</NormalText>
                        <NormalText>
                            {this.state.classAddressString}
                        </NormalText>
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
                <View style={[{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}]}>
                    <View style={[{ flex: 1 }]}>
                        <NormalText>Click the add button to add an address.</NormalText>
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
                            color={Colors.headerTextIcons} 
                            onPress={() => this._handleBackButtonClicked()}
                            />
                    </View>

                    <Text style={[Styles.pageTitle]}>Class Location</Text>

                    <View style={Styles.navbarRight}>
                    <NormalText style={[Styles.textBold, Styles.textColorBlack]} 
                        onPress={() => this._handleBackButtonClicked()}>Done</NormalText>
                    </View>
                </View>


                <View style={[Styles.container]}>
                    <View style={[Styles.marginB, {flex: 1, justifyContent: 'flex-start'}]}>
                        {this._renderAddressInfo()}
                    </View>

                    <View style={[Styles.marginNone, Styles.marginT, { flex: 3, alignItems: 'stretch' }]}>
                        <MapView
                            scrollEnabled={false} zoomEnabled={false} style={mapStyles.map}
                            provider={PROVIDER_GOOGLE}
                            region={{
                                latitude: this.state.classLatitude,
                                longitude: this.state.classLongitude,
                                latitudeDelta: 0.005,
                                longitudeDelta: 0.005,
                            }}>
                            
                            <MapView.Marker draggable
                                coordinate={{
                                    latitude: this.state.classLatitude,
                                    longitude: this.state.classLongitude,
                                }}
                                title={"Class Location"}
                                description={this.state.classAddressString}
                            />
                        </MapView>
                    </View>

                </View>

                <Modal isVisible={this.state.changeAddressModalVisible} style={Styles.bottomModal}>
                    <View style={Styles.modalContent}>
                        <SubHeadingText>School/Class Address</SubHeadingText>
                        <NormalInput placeholder="Address line 1" value={this.state.inputAddrLine1}
                            onChangeText={(text) => this._handleAddressLine1Changed(text)} />

                        <NormalInput placeholder="City" value={this.state.inputAddrCity}
                            onChangeText={(text) => this._handleCityAddressChanged(text)} />

                        <View style={[{ flexDirection: 'row' }, Styles.marginB]}>
                            <NormalInput placeholder="State" value={this.state.inputAddrState} style={{ flex: 2 }}
                                onChangeText={(text) => this._handleStateAddressChanged(text)} />

                            <NumericInput placeholder="Zip" value={this.state.inputAddrZip} style={{ flex: 1 }}
                                onChangeText={(text) => this._handleZipAddressChanged(text)} />
                        </View>

                        {
                            this.state.isFetchingAddr ? (
                                <View style={[Styles.marginBLarge]}>
                                <ActivityIndicator size='large' color={Colors.primaryDark} />
                            </View>
                            ): (null)
                        }
                       
                        <View>
                            <AccentButton text={this.state.classAddressString ? "Update" : "Add"} onPress={() => { this._handleSubmitAddressChange() }} />
                            <BlackButton style={[Styles.marginT]} text="Cancel" onPress={() => {this._handleCancelAddressChange()}}/>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}