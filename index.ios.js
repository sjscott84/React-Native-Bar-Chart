
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  //Text,
  View,
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

class testGraph extends Component {
  render() {
    return (
      <View>
      <Svg style={styles.svg} height={h} width={w}>
        {this._svgGraph()}
      </Svg>
      </View>
    );
  }

  _svgGraph(){
    let rectangles = []; //Array of bars
    let text = []; //tick points on axis
    let tickLines = []; //tick lines

    //Measurments for placement of axis
    const lowNumberForXAxis = 32;
    const lowNumberForYAxis = 0;
    const highNumberForYAxis = 299;
    const highNumberForXAxis = 299;//This will need to be based on the screen width of device
    const barPadding = 2;

    //Get max number from data set
    let max = function(){
      let currentMax = dataset[0];
      for(var i = 0; i<dataset.length; i++){
        if(dataset[i] > currentMax){
          currentMax = dataset[i];
        }
      }
      return currentMax;
    }();

    getTicks(6);
    getBars();

    function getHeight(axisHeight, datasetMax, newNumber){
      let height = (newNumber/datasetMax)*axisHeight;
      return height;
    };

    function getTicks(numberofTicks){
      let fontSize = 11;
      text.push(<Text key={0} stroke="black" fontSize={fontSize} x={1} y={highNumberForYAxis-12}>{'0'}</Text>);

      for(var i = 1; i <= numberofTicks; i++){
        let tickText = Math.round(((max/numberofTicks)*[i])*100)/100;
        let tickY = getHeight(highNumberForYAxis, max, tickText);
        text.push(<Text key={tickText} stroke="black" fontSize={fontSize} x={1} y={highNumberForYAxis-tickY}>{tickText}</Text>);
        tickLines.push(<Line key={tickText} x1={lowNumberForXAxis} y1={highNumberForYAxis-tickY} x2={highNumberForXAxis} y2={highNumberForYAxis-tickY} stroke='gray' strokeWidth={0.75} />);
      }
    };

    function getBars(){
      for(var i = 0; i < dataset.length; i++){
        let height = getHeight(highNumberForYAxis, max, dataset[i]);
        let width = (highNumberForXAxis - lowNumberForXAxis) / dataset.length - barPadding;
        let x = (lowNumberForXAxis + barPadding) + rectangles.length * (highNumberForXAxis - lowNumberForXAxis) / dataset.length;//rectangles.length * highNumberForXAxis / dataset.length
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
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  svg: {
    marginTop: 150,
    marginLeft: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});


AppRegistry.registerComponent('testGraph', () => testGraph);
