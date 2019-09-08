/*Example of Expandable ListView in React Native*/
import React, { Component } from 'react';
import styles from 'styles/styles';
//import react in our project
import {
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
//import basic react native components
import {LineChartMid,LineChartSingleValue,DognutChartMultipleValues} from './Charts';

class ExpandableItemComponent extends Component {
  //Custom Component for the Expandable List
  constructor() {
    super();
    this.state = {
      layoutHeight: 0,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.item.isExpanded) {
      this.setState(() => {
        return {
          layoutHeight: null,
        };
      });
    } else {
      this.setState(() => {
        return {
          layoutHeight: 0,
        };
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.layoutHeight !== nextState.layoutHeight) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <View>
        {/*Header*/}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.props.onClickFunction}
          style={styles.header}>

          <Text style={styles.headerText}>{this.props.item.category_name}</Text>
          <Image
            source={{
              uri: 'https://reactnativecode.com/wp-content/uploads/2019/02/arrow_right_icon.png'
            }}
            style={styles.iconStyle} 
          />
        </TouchableOpacity>
        <View

          style={{
            height: this.state.layoutHeight,
            overflow: 'hidden',
          }}>

          {/*Conteudo do ListView*/}
          {this.props.item.items.map((item, key) => (

            <TouchableOpacity
              key={key}
              style={styles.contentList}
              onPress={() => alert('Id: ' + item.id + ' type: ' + item.type)}>

               {  this.props.item.type == 1 ? 
                    <LineChartMid id={key} item={item}/>
                  : this.props.item.type == 2 ?
                    <DognutChartMultipleValues id={key} item={item}/>
                  : this.props.item.type == 3 ?
                    <LineChartSingleValue id={key} item={item}/>
                  : 
                    <Text style={styles.text}>
                      {key}. {item.type}
                    </Text>
                } 

              <View style={styles.separator} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}

class ListView extends Component {
  //Main View
  constructor() {
    super();
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.state = { listDataSource: CONTENT };
  }

  updateLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...this.state.listDataSource];
    //Para uma unica expansão por ves
    array.map((value, placeindex) =>
      placeindex === index
        ? (array[placeindex]['isExpanded'] = !array[placeindex]['isExpanded'])
        : (array[placeindex]['isExpanded'] = false)
    );

    //Para multiplas expansões
    //array[index]['isExpanded'] = !array[index]['isExpanded'];
    this.setState(() => {
      return {
        listDataSource: array,
      };
    });
  };

  render() {
    return (
      <View style={styles.containerList}>

        <Text style={styles.topHeading}>Detalhes</Text>
        
        <ScrollView style={{paddingBottom: 20}}>
          {this.state.listDataSource.map((item, key) => (
            <ExpandableItemComponent
              key={item.category_name}
              onClickFunction={this.updateLayout.bind(this, key)}
              item={item}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

//Dummy content to show
//You can also use dynamic data by calling webservice
const CONTENT = [
  {
    isExpanded: false,
    category_name: 'Temperatura',
    type: 1,
    image_link: 'https://live.hopu.eu/images/icon-sensor-noise.png',
    items: [
      { id: 1, type: 'line_chart', values: [{id: 1, max: 25.47, min: 24.02}] }
    ],
  },
  {
    isExpanded: false,
    category_name: 'Humidade',
    type: 1,
    image_link: 'https://live.hopu.eu/images/icon-sensor-crowd_monitoring.png',
    items: [
      { id: 1, type: 'line_chart', values: [{id: 1, max: 64.45, min: 50.47}] }
    ],
  },
  {
    isExpanded: false,
    category_name: 'Gases',
    type: 2,
    image_link: 'https://live.hopu.eu/images/icon-sensor-crowd_monitoring.png',
    items: [
      { id: 1, type: 'dognut_chart', values: [
          {id: 1, value: 56.45, gas: 'O3'},
          {id: 2, value: 19.36, gas: 'NO2'},
          {id: 3, value: 51.44, gas: 'SO2'},
          {id: 4, value: 9.87, gas: 'CO'}
        ]
      }
    ],
  },
  {
    isExpanded: false,
    category_name: 'Ruído',
    type: 3,
    image_link: 'https://live.hopu.eu/images/icon-sensor-crowd_monitoring.png',
    items: [
      { id: 1, type: 'line_chart', values: [{id: 1, value: 15.44}] }
    ],
  },
  {
    isExpanded: false,
    category_name: 'Bateria',
    type: 3,
    image_link: 'https://live.hopu.eu/images/icon-sensor-crowd_monitoring.png',
    items: [
      { id: 1, type: 'line_chart', values: [{id: 1, value: 10}] }
    ],
  },
];

export default ListView;
