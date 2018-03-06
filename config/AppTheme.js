import { StyleSheet } from 'react-native';
// import { Constants } from 'expo';

// Constants that are used for styling the app.
export const Colors = {
  primary: '#2962FF',
  primaryDark: '#0D47A1',
  accent: '#FFD600',
  positive: '#00C853',
  warning: '#FF6D00',
  negative: '#D50000',
  muted: '#b1b1b1',
};

export const Defaults = {
  margin: 20,
  marginSmall: 10,
  padding: 20,
  paddingSmall: 10,
  fontFamilyRegular: 'OpenSans-Regular',
  fontFamilyLight: 'OpenSans-Light',
  textSize: 16,
  textColorRegular: '#636363',
  textColorHeading: '#4e4e4e',
  textColorSubHeading: '#3e3e3e',
};

export const Styles = StyleSheet.create({
  // Typically used to hold the contents of a entire page.
  mainContainer: {
    flex: 1,
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ffffff',
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
    backgroundColor: '#ffffff',
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
    color: '#000000',
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
    backgroundColor: '#000000',
  },
  // Untility Styles
  textRegular: {
    color: Defaults.textColorRegular,
    fontFamily: Defaults.fontFamilyRegular,
    fontSize: Defaults.textSize,
    lineHeight: 30,
  },
  textHeading: {
    color: Defaults.textColorHeading,
    fontFamily: Defaults.fontFamilyRegular,
    fontSize: Defaults.textSize + 5,
    fontWeight: 'bold',
    marginTop: Defaults.margin,
    marginBottom: Defaults.margin,
  },
  textSubHeading: {
    color: Defaults.textColorSubHeading,
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
