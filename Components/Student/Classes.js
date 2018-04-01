import React, { Component } from 'react';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { Button, Icon, List, ListItem } from 'react-native-elements';
import AuthService from '../../Services/AuthService';
import DeviceService from '../../Services/DeviceService';
import DeviceInfo from 'react-native-device-info';
import { Styles, Colors } from '../../config/AppTheme';
import { NormalText, HeadingText, PrimaryDarkButton, BlackButton } from '../UtilComponents';
import Modal from 'react-native-modal';
import moment from 'moment';

export default class Classes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deviceInfo: DeviceInfo.getUniqueID(),
            isLoading: true,
            deviceData: null,
            showClassDetailsModal: false,
            className: null,
            enrolledDate: null
        }
    }

    componentWillMount() {
        DeviceService.getDevice(this.state.deviceInfo, (res) => {
            this.setState({
                isLoading: false,
                deviceData: res
            });
        });
    }

    _handleClassItemClicked = (classId) => {
        this.setState({
            showClassDetailsModal: true,
            className: this.state.deviceData.classesEnrolled[classId].className,
            enrolledDate: this.state.deviceData.classesEnrolled[classId].dateEnrolled,
        });
    }

    _handleCloseClassDetailsClicked = () => {
        this.setState({
            showClassDetailsModal: false,
            className: null,
            enrolledDate: null
        })
    }

    _handleShowAttendanceClicked = (classId) => {
        this.props.navigation.navigate('Attendance', {
            classId: classId,
            deviceId: this.state.deviceInfo,
            deviceData: this.state.deviceData,
        });
    }

    _renderClassesList = () => {
        if (this.state.deviceData.classesEnrolled) {
            return (
                <List containerStyle={[Styles.marginNone, Styles.listMarginPaddingFix, { paddingLeft: 20, paddingRight: 20 }]}>
                    {
                        Object.keys(this.state.deviceData.classesEnrolled).map((i) => (
                            <ListItem
                                key={i}
                                title={this.state.deviceData.classesEnrolled[i].className}
                                titleStyle={[Styles.textRegular, Styles.textBold]}
                                subtitleStyle={[Styles.textRegualrFontOnly]}
                                rightIcon={
                                    <Icon
                                        raised
                                        reverse
                                        size={20}
                                        name='calendar'
                                        type='font-awesome'
                                        color={Colors.primaryDark}
                                        onPress={() => { this._handleShowAttendanceClicked(i) }} />
                                }
                                onPress={() => {
                                    this._handleClassItemClicked(i);
                                }}
                            />
                        ))
                    }
                </List>
            );
        } else {
            return (
                <View style={[Styles.centerContents]}> 
                     <NormalText style={[Styles.textBold]}>You aren't enrolled in any classes.</NormalText>
                </View>
               
            );
        }
    }

    render() {
        if (!this.state.isLoading) {
            return (
                <View style={[Styles.mainContainer]}>
                    <View style={[Styles.navbar]}>

                        <View style={[Styles.navbarLeft]}>
                        </View>

                        <Text style={[Styles.pageTitle]}>Your Classes</Text>

                        <View style={Styles.navbarRight}>
                        </View>
                    </View>
                    <ScrollView>
                        <View style={[Styles.container]}>
                            {this._renderClassesList()}
                        </View>
                    </ScrollView>

                    <Modal isVisible={this.state.showClassDetailsModal}>
                        <View style={Styles.modalContent}>
                            <HeadingText>Class Information</HeadingText>

                            <View>
                                <NormalText style={[{fontSize: 20}]}>Class Name: {this.state.className}</NormalText>
                                <NormalText style={[{fontSize: 20}]}>Date Enrolled: {moment(this.state.enrolledDate).format('LL')}</NormalText>

                                <BlackButton style={[Styles.btnSmall, Styles.marginTLarge]}
                                    text="Close" onPress={() => { this._handleCloseClassDetailsClicked() }} />
                            </View>

                        </View>
                    </Modal>


                </View>
            );
        } else {
            return (
                <View style={[Styles.mainContainer]}>
                    <View style={[Styles.container, Styles.centerContents]}>
                        <ActivityIndicator size='large' color={Colors.primaryDark} />
                    </View>

                </View>
            );
        }
    }
}