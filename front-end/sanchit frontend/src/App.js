import React, {Component} from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import logo from './logo.svg';
import './App.css';
const axios = require('axios');


//function App() {
export default class App extends React.Component {
    constructor(props){
      super(props);
      this.state =
      { 
        isLoading: true, 
      }
    }
  
    render(){
      const { 
        plainSource, 
      text01, text02, text03, text04, text05, text06, text07, text08, text09, text10, text11
      } = this.state;
  
      if(this.state.isLoading){
        return(
          <View style={{flex: 1, padding: 20}}>
            <ActivityIndicator/>
          </View>
        )
      } else
  
      return(
  
        <View style={styles.container}>
      
        <View style={styles.textBit}>
        <Text style={styles.titleText}> Subway updates </Text>
        </View>
  
        <View style={styles.box}>
          <View style={styles.lineItem}>
  
          <View style={styles.lineRow}>
          <View style={styles.leftColumn}>
          <View style={[styles.circle, styles.color01]}><Text style={styles.circleText}>1</Text></View>
          <View style={[styles.circle, styles.color01]}><Text style={styles.circleText}>2</Text></View>
          <View style={[styles.circle, styles.color01]}><Text style={styles.circleText}>3</Text></View>
          </View>
  
          <View style={styles.rightColumn}>
          <Text style=
          {[styles.rightColumnText, 
            {color:  text01 == "GOOD SERVICE" ? 'black' : 'orange'}
            ]}>{text01}</Text>
          </View>
  
  
          </View>
          </View>
  
          <View style={styles.lineItem}>
          <View style={styles.lineRow}>
          <View style={styles.leftColumn}>
          <View style={[styles.circle, styles.color02]}><Text style={styles.circleText}>4</Text></View>
          <View style={[styles.circle, styles.color02]}><Text style={styles.circleText}>5</Text></View>
          <View style={[styles.circle, styles.color02]}><Text style={styles.circleText}>6</Text></View>
          </View>
  
          <View style={styles.rightColumn}>
           <Text style=
          {[styles.rightColumnText, 
            {color:  text02 == "GOOD SERVICE" ? 'black' : 'orange'}
            ]}>{text02}</Text>
          </View>
  
          </View>
          </View>
          <View style={styles.lineItem}>
          <View style={styles.lineRow}>
          <View style={styles.leftColumn}>
          <View style={[styles.circle, styles.color03]}><Text style={styles.circleText}>7</Text></View>
          </View>
  
          <View style={styles.rightColumn}>
           <Text style=
          {[styles.rightColumnText, 
            {color:  text03 == "GOOD SERVICE" ? 'black' : 'orange'}
            ]}>{text03}</Text>
          </View>
  
          </View>
          </View>
          <View style={styles.lineItem}>
          <View style={styles.lineRow}>
          <View style={styles.leftColumn}>
          <View style={[styles.circle, styles.color04]}><Text style={styles.circleText}>A</Text></View>
          <View style={[styles.circle, styles.color04]}><Text style={styles.circleText}>C</Text></View>
          <View style={[styles.circle, styles.color04]}><Text style={styles.circleText}>E</Text></View>
          </View>
          
          <View style={styles.rightColumn}>
           <Text style=
          {[styles.rightColumnText, 
            {color:  text04 == "GOOD SERVICE" ? 'black' : 'orange'}
            ]}>{text04}</Text>
          </View>
  
          </View>
          </View>
  
          <View style={styles.lineItem}>
          <View style={styles.lineRow}>
          <View style={styles.leftColumn}>
          <View style={[styles.circle, styles.color05]}><Text style={styles.circleText}>B</Text></View>
          <View style={[styles.circle, styles.color05]}><Text style={styles.circleText}>D</Text></View>
          <View style={[styles.circle, styles.color05]}><Text style={styles.circleText}>F</Text></View>
          <View style={[styles.circle, styles.color05]}><Text style={styles.circleText}>M</Text></View>
          </View>
  
          <View style={styles.rightColumn}>
           <Text style=
          {[styles.rightColumnText, 
            {color:  text05 == "GOOD SERVICE" ? 'black' : 'orange'}
            ]}>{text05}</Text>
          </View>
  
          </View>
          </View>
  
          <View style={styles.lineItem}>
          <View style={styles.lineRow}>
          <View style={styles.leftColumn}>
          <View style={[styles.circle, styles.color06]}><Text style={styles.circleText}>G</Text></View>
          </View>
  
          <View style={styles.rightColumn}>
          <Text style=
          {[styles.rightColumnText, 
            {color:  text06 == "GOOD SERVICE" ? 'black' : 'orange'}
            ]}>{text06}</Text>
          </View>
          </View>
          </View>
  
           <View style={styles.lineItem}>
           <View style={styles.lineRow}>
          <View style={styles.leftColumn}>
          <View style={[styles.circle, styles.color07]}><Text style={styles.circleText}>J</Text></View>
          <View style={[styles.circle, styles.color07]}><Text style={styles.circleText}>Z</Text></View>
          </View>
  
          <View style={styles.rightColumn}>
          <Text style=
          {[styles.rightColumnText, 
            {color:  text07 == "GOOD SERVICE" ? 'black' : 'orange'}
            ]}>{text07}</Text>
          </View>
  
          </View>
          </View>
  
          <View style={styles.lineItem}>
          <View style={styles.lineRow}>
          <View style={styles.leftColumn}>
          <View style={[styles.circle, styles.color08]}><Text style={styles.circleText}>L</Text></View>
          </View>
          
          <View style={styles.rightColumn}>
          <Text style=
          {[styles.rightColumnText, 
            {color:  text08 == "GOOD SERVICE" ? 'black' : 'orange'}
            ]}>{text08}</Text>
          </View>
          </View>
          </View>
  
          <View style={styles.lineItem}>
          <View style={styles.lineRow}>
          <View style={styles.leftColumn}>
          <View style={[styles.circle, styles.color09]}><Text style={[styles.circleText, styles.fontBlack]}>N</Text></View>
          <View style={[styles.circle, styles.color09]}><Text style={[styles.circleText, styles.fontBlack]}>Q</Text></View>
          <View style={[styles.circle, styles.color09]}><Text style={[styles.circleText, styles.fontBlack]}>R</Text></View>
          </View>
  
          <View style={styles.rightColumn}>
          <Text style=
          {[styles.rightColumnText, 
            {color:  text09 == "GOOD SERVICE" ? 'black' : 'orange'}
            ]}>{text09}</Text>
          </View>
  
          </View>
          </View>
  
          <View style={styles.lineItem}>
          <View style={styles.lineRow}>
          <View style={styles.leftColumn}>
          <View style={[styles.circle, styles.color10]}><Text style={styles.circleText}>S</Text></View>
          </View>
  
          <View style={styles.rightColumn}>
          <Text style=
          {[styles.rightColumnText, 
            {color:  text10 == "GOOD SERVICE" ? 'black' : 'orange'}
            ]}>{text10}</Text>
          </View>
  
          </View>
          </View>
  
          <View style={styles.lineItem}>
          <View style={styles.lineRow}>
          <View style={styles.leftColumn}>
          <View style={[styles.circle, styles.color11]}><Text style={styles.circleText}>SIR</Text></View>
          </View>
  
          <View style={styles.rightColumn}>
          <Text style=
          {[styles.rightColumnText, 
            {color:  text11 == "GOOD SERVICE" ? 'black' : 'orange'}
            ]}>{text11}</Text>
          </View>
          </View>
          </View>
  
          </View>
  
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 0.7,
      flexDirection: 'column',
      paddingLeft: '8%',
      paddingRight: '8%',
      paddingTop: '2%',
      paddingBottom: '5%',
      fontFamily: 'Helvetica',
    },
    textBit: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      paddingBottom: 10,
    },
    titleText: {
      fontWeight: 'bold',
      fontSize: 21,
      color: '#0039A6',
      flex: 0.9,
    },
      box: {
      borderBottomWidth: 1,
      borderBottomColor: 'black',
      borderLeftWidth: 0.5,
      borderLeftColor: 'black',
      borderRightWidth: 0.5,
      borderRightColor: 'black',
    },
    lineRow: {
      flexDirection: 'row',
    },
    leftColumn: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '40%',
      borderRightWidth: 0.5,
      borderRightColor: 'grey',
      paddingLeft: 5,
      fontSize: 18,
      paddingTop: 1,
      paddingBottom: 1,
      fontWeight: 'bold',
      backgroundColor: 'white',
    },
    circle: {
      //To make Circle Shape
      width: 25,
      height: 25,
      borderRadius: 25 / 2,
      backgroundColor: 'grey',
      marginRight: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    circleText: {
      flexDirection: 'row',
      justifyContent: 'center',
      textAlign: 'center',
      fontWeight: 'bold',
      color: 'white'
    },
    color01: {
      backgroundColor: '#EE352E'
    },
    color02: {
      backgroundColor: '#00933C'
    },
    color03: {
      backgroundColor: '#B933AD'
    },
    color04: {
      backgroundColor: '#0039A6',
    },
    color05: {
      backgroundColor: '#FF6319',
    },
    color06: {
      backgroundColor: '#6CBE45',
    },
    color07: {
      backgroundColor: '#996633',
    },
    color08: {
      backgroundColor: '#A7A9AC',
    },
    color09: {
      backgroundColor: '#FCCC0A',
    },
    color10: {
      backgroundColor: '#808183',
    },
    color11: {
      backgroundColor: '#0039A6',
    },
    fontBlack: {
      color: 'black',
    },
    leftColumnText: {
      color: 'black',
      fontWeight: 'bold',
    },
    rightColumn: {
      flex:1,
      paddingLeft: 5,
      backgroundColor: 'white',
    },
    rightColumnText: {
      fontWeight: 'bold',
    },
    lineItem: {
      borderTopWidth: 1,
      borderTopColor: 'grey',
    },
  
  });
  
  

  
