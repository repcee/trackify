import { StyleSheet } from 'react-native';
// import { Constants } from 'expo';

// Constants that are used for styling the app.
export const Colors = {
  primary: '#9ECDFF',
  primaryDark: '#4990E2',
  accent: '#A3A8F8',
  positive: '#00ca9d',
  warning: '#f5a622',
  negative: '#D50000',
  black: '#35343d',
  muted: '#b1b1b1',
  textColorRegular: '#8B95A3',
  textColorHeading: '#6E7B8C',
  textColorSubHeading: '#6E7B8C',
  headerTextIcons: '#6E7B8C'
};

export const Defaults = {
  margin: 20,
  marginSmall: 10,
  padding: 20,
  paddingSmall: 10,
  fontFamilyRegular: 'OpenSans-Regular',
  fontFamilyLight: 'OpenSans-Light',
  textSize: 16
};

export const Styles = StyleSheet.create({
  // Typically used to hold the contents of a entire page.
  mainContainer: {
    flex: 1,
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#F5F7FA',
  },
  // Typically used to hold content in the content area of the page.
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: Defaults.padding,
  },
  centerContents: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    backgroundColor: '#F5F7FA',
    elevation: 2
  },
  navbarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: Defaults.padding,
    paddingRight: Defaults.padding,
    backgroundColor: 'transparent'
  },
  navbarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: Defaults.padding,
    paddingRight: Defaults.padding,
    backgroundColor: 'transparent'
  },

  pageTitle: {
    color: Colors.headerTextIcons,
    fontFamily: Defaults.fontFamilyRegular,
    fontSize: Defaults.textSize + 3,
    paddingLeft: Defaults.padding,
    paddingRight: Defaults.padding,
    overflow: 'hidden',
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  //==============More container styles
  horizontalContainer: {
    // padding: Defaults.padding,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },

  //===============Button styles
  btn: {
    width: 300,
    height: 45,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: (45/2),
  },
  btnSmall: {
    width: 150,
    height: 45,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: (45/2),
  },
  btnPrimary: {
    backgroundColor: Colors.primary,
  },
  btnAccent: {
    backgroundColor: Colors.accent,
  },
  btnWarning: {
    backgroundColor: Colors.warning,
  },
  btnPositive: {
    backgroundColor: Colors.positive,
  },
  btnNegative: {
    backgroundColor: Colors.negative,
  },
  btnBlack: {
    backgroundColor: Colors.black,
  },
  btnBlackReal: {
    backgroundColor: '#000000',
  },
  // Untility Styles
  textRegular: {
    color: Colors.textColorRegular,
    fontFamily: Defaults.fontFamilyRegular,
    fontSize: Defaults.textSize,
    lineHeight: 30,
  },
  textHeading: {
    color: Colors.textColorHeading,
    fontFamily: Defaults.fontFamilyRegular,
    fontSize: Defaults.textSize + 5,
    fontWeight: 'bold',
    marginTop: Defaults.margin,
    marginBottom: Defaults.margin,
  },
  textSubHeading: {
    color: Colors.textColorSubHeading,
    fontFamily: Defaults.fontFamilyRegular,
    fontSize: Defaults.textSize,
    fontWeight: 'bold',
    marginTop: Defaults.margin,
    marginBottom: Defaults.margin,
  },
  textColorWhite: {
    color: '#ffffff',
  },
  textColorBlack: {
    color: Colors.black,
  },
  textColorBlackReal: {
    color: '#000000',
  },
  textColorPrimary: {
    color: Colors.primary,
  },
  textColorAccent: {
    color: Colors.accent,
  },
  textColorMuted: {
    color: Colors.muted,
  },
  textBold: {
    fontWeight: 'bold',
  },
  marginTB: {
    marginTop: Defaults.margin,
    marginBottom: Defaults.margin,
  },
  marginT: {
    marginTop: Defaults.margin,
  },
  marginR: {
    marginRight: Defaults.margin,
  },
  marginB: {
    marginBottom: Defaults.margin,
  },
  marginL: {
    marginLeft: Defaults.margin,
  },
  marginTSmall: {
    marginTop: Defaults.marginSmall,
  },
  marginRSmall: {
    marginRight: Defaults.marginSmall,
  },
  marginBSmall: {
    marginBottom: Defaults.marginSmall,
  },
  marginLSmall: {
    marginLeft: Defaults.marginSmall,
  },
});
