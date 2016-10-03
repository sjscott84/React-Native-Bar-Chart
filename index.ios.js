
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  //Text,
  View,
  Dimensions
} from 'react-native';
import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Text,
    Use,
    Defs,
    Stop
} from 'react-native-svg';

var dataset = [5, 6.7, 4.3, 8, 11, 5, 3, 2.6, 8, 10, 14, 4.3, 8, 11, 5, 3, 2.6, 8, 10, 14];
var screenWidth = Dimensions.get('window');

class testGraph extends Component {
  render() {
    return (
      <View>
        <Svg style={styles.svg}>
          {this._svgGraph()}
        </Svg>
      </View>
    );
  }

  _svgGraph(){
    let rectangles = []; //Array of bars
    let text = []; //tick points on axis
    let tickLines = []; //tick lines;

    //Measurments for placement of axis
    const lowNumberForXAxis = 32;
    const lowNumberForYAxis = 0;
    const highNumberForYAxis = 115;
    const highNumberForXAxis = screenWidth.width-20;//Screen width minus the margins
    const barPadding = 2;

    //Get max number from data set
    let max = function(){
      let currentMax = dataset[0];
      for(var i = 0; i < dataset.length; i++){
        if(dataset[i] > currentMax){
          currentMax = dataset[i];
        }
      }
      return currentMax;
    }();

    getTicks(3);
    getBars();

    //Get the relative height based on the propportion between max number and total screen height
    function getHeight(axisHeight, datasetMax, newNumber){
      let height = (newNumber / datasetMax) * axisHeight;
      return height;
    };

    //Get the axis labels and lines
    function getTicks(numberofTicks){
      let lineHeight = 14;
      //Create the axis labels for top and bottom as well as the top axis line (these are done seperatly to ensure they display correctly)
      text.push(<Text key={0} style={styles.text} x={1} y={highNumberForYAxis - lineHeight}>{'0'}</Text>);
      text.push(<Text key={max} style={styles.text} x={1} y={lowNumberForYAxis}>{max}</Text>);
      tickLines.push(<Line key={max} x1={lowNumberForXAxis} y1={lowNumberForYAxis + 1} x2={highNumberForXAxis} y2={lowNumberForYAxis + 1} stroke='gray' strokeWidth={0.75} />);

      //Create the axis labels and lines for everthing in between 0 and max, numbers displayed to 2 decimal places
      for(var i = 1; i < numberofTicks; i++){
        let tickText = Math.round(((max / numberofTicks) * [i]) * 100) / 100;
        let tickY = getHeight(highNumberForYAxis, max, tickText);
        text.push(<Text key={tickText} style={styles.text} lineHeight={lineHeight} x={1} y={highNumberForYAxis - tickY - (lineHeight / 2)}>{tickText}</Text>);
        tickLines.push(<Line key={tickText} x1={lowNumberForXAxis} y1={highNumberForYAxis - tickY} x2={highNumberForXAxis} y2={highNumberForYAxis - tickY} stroke='gray' strokeWidth={0.75} />);
      }
    };

    //Create the bars for the graph
    function getBars(){
      for(var i = 0; i < dataset.length; i++){
        let height = getHeight(highNumberForYAxis, max, dataset[i]);
        let width = (highNumberForXAxis - lowNumberForXAxis) / dataset.length - barPadding;
        let x = (lowNumberForXAxis + barPadding) + rectangles.length * (highNumberForXAxis - lowNumberForXAxis - 5) / dataset.length;
        let y = highNumberForYAxis - height;
        rectangles.push(<Rect key={rectangles.length} x={x} y={y} width={width} height={height} fill={'rgb(23,153,173)'} />)
      }
    };

    return(
      <G>
        <Line x1={lowNumberForXAxis} y1={lowNumberForYAxis} x2={lowNumberForXAxis} y2={highNumberForYAxis} stroke='black' strokeWidth={1} />
        <Line x1={lowNumberForXAxis} y1={highNumberForYAxis} x2={highNumberForXAxis} y2={highNumberForYAxis} stroke='black' strokeWidth={1} />
        {text}
        {tickLines}
        {rectangles}
      </G>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  svg: {
    marginTop: 150,
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    height: 300
  },
  text: {
    fontFamily: 'AppleSDGothicNeo-Medium',
    fontSize: 10,
    color: 'rgb(122,143,147)'
  }
});


AppRegistry.registerComponent('testGraph', () => testGraph);
