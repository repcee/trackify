import React, { Component } from 'react';
import { Text, View, ScrollView, ActivityIndicator} from 'react-native';
import { Button, Icon, List, ListItem } from 'react-native-elements';
import AuthService from '../../Services/AuthService';
import UserService from '../../Services/UserService';
import { NavigationActions } from 'react-navigation';
import { Styles, Colors } from '../../config/AppTheme';
import { NormalText, SubHeadingText, PrimaryDarkButton, AccentButton } from '../UtilComponents';
import ClassService from '../../Services/ClassService';


export default class ClassDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            className: this.props.navigation.getParam('classData').className,
            classId: this.props.navigation.getParam('classData').classId,

            enrolledStudents: null,
            unlinkedStudents: null,
            attendance: null,
            classData: null,

            // others
            isLoading: true
        };
    }

    componentWillMount() {
        const classd = ClassService.getClass(this.state.classId, (classDets) => {
            if (classDets !== null) {
                console.log("details: ", classDets.enrolledStudents);

                this.setState({
                    classData: classDets,
                    enrolledStudents: classDets.enrolledStudents ? Object.values(classDets.enrolledStudents).reverse() : null,
                    unlinkedStudents: classDets.unlinkedStudents || null,
                    isLoading: false
                });
                console.log("enrolled: ", this.state.unlinkedStudents);
            } else {
                this.props.navigation.dispatch(
                    NavigationActions.back({
                        key: null
                    })
                );
                alert("Class not found");
            }
           
        });
    }

    _handleUnlinkedStudentClicked = (unlinedStudentIndex) => {
        this.props.navigation.navigate('LinkStudentByQRCode', {
            classId: this.state.classId, 
            className: this.state.className,
            unlinkedIndex: unlinedStudentIndex,
            studentName: this.state.unlinkedStudents[unlinedStudentIndex]
        });
    }

    _handleEditButtonClicked = () => {
        alert("To be implemented.");
    }

    _renderEnrolledStudents = () => {
        if (this.state.enrolledStudents) {
            return (
                <List containerStyle={[Styles.marignLRNone, { marginBottom: 20 }]}>
                    {
                        this.state.enrolledStudents.map((l, i) => (
                            <ListItem
                                key={i}
                                title={`${l.firstName} ${l.lastName}`}
                                onPress={() => {
                                    alert("Okay");
                                }}
                            />
                        ))
                    }
                </List>
            );
        } else {
            return (
                <NormalText>No enrolled students.</NormalText>
            );
        }
    }

    _renderUnLinkedStudents = () => {
        if (this.state.unlinkedStudents) {
            return (
                <List containerStyle={[Styles.marignLRNone, { marginBottom: 20 }]}>
                    {
                        this.state.unlinkedStudents.map((l, i) => (
                            <ListItem
                                key={i}
                                title={l}
                                onPress={(e) => {
                                    this._handleUnlinkedStudentClicked(i, e);
                                }}
                            />
                        ))
                    }
                </List>
            );
        } else {
            return (
                <NormalText>No unlinked students.</NormalText>
            );
        }
    }

    _rednerDetails = () => {
        if (this.state.isLoading) {
            return (
                <ActivityIndicator size='large' color={Colors.primaryDark} />
            );
        } else {
            return (
                <View style={[Styles.container]}>
                <NormalText>{this.state.classData.description}</NormalText>

                <View style={[Styles.marT]}>                
                    <SubHeadingText style={[Styles.textBold]}>Unlinked Students</SubHeadingText>
                    {this._renderUnLinkedStudents()}
                </View>

                <View style={[Styles.marginTLarge]}>                
                    <SubHeadingText style={[Styles.textBold]}>Enrolled Students</SubHeadingText>
                    {this._renderEnrolledStudents()}
                </View>
            </View>
            );
        }
    }

    render() {
        console.log(this.state.classData);
        return (
            <View style={[Styles.mainContainer]}>
                <View style={[Styles.navbar]}>

                    <View style={[Styles.navbarLeft]}>
                        <Icon name="arrow-left" type="font-awesome"
                            color={Colors.headerTextIcons} />
                    </View>

                    <Text style={[Styles.pageTitle]}>{this.state.className}</Text>

                    <View style={Styles.navbarRight}>
                        <Icon name="edit" type="font-awesome"
                            raised
                            reverse
                            size={20}
                            color={Colors.headerTextIcons}
                            onPress={() => {this._handleEditButtonClicked()}}
                        />
                    </View>
                </View>
                <ScrollView>
                    {this._rednerDetails()}
                </ScrollView>

            </View>
        );
    }
}