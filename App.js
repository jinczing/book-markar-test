/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import { RNCamera } from 'react-native-camera';
import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import DraggableBox from './GestureComponents/DraggableBox';
import DraggableTwoCircles from './GestureComponents/DraggableTwoCircles';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      textBlocks: [],
    }
  }

  textRecognized = ({ textBlocks }) => {
    //textBlocks.forEach(textBlock => console.warn(textBlock.value))
    this.setState({ textBlocks })
  }
  barcodeRecognized = ({ barcodes }) => {
    barcodes.forEach(barcode => console.warn(barcode.data))
  }

  renderTextBlocks = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.textBlocks.map(this.renderTextBlock)}
    </View> 
  )

  renderTextBlock = ({ bounds, value }) => (
    <React.Fragment key={value + bounds.origin.x}>
      <Text style={[styles.textBlock, { left: bounds.origin.x, top: bounds.origin.y }]}>
        {value}
      </Text>
      <View
        style={[
          styles.text,
          {
            ...bounds.size,
            left: bounds.origin.x,
            top: bounds.origin.y,
          },
        ]}
      />
    </React.Fragment>
  )

  render() {
    return (
      <React.Fragment>
        <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        onTextRecognized={this.textRecognized}
        >
        {/* <DraggableBox /> */}
        
        <View style={[styles.box,
          {
            left: 50
          }
        ]}></View>
        <DraggableTwoCircles />
        <View style={styles.box}></View>

        
        

          
      {this.renderTextBlocks()}
          
      </RNCamera>

      

      </React.Fragment>


      
  
    );
  }
  

}

const styles = StyleSheet.create({
  box: {
    height: 100,
    width: 100,
    backgroundColor: 'red'
  },
  trapezoid: {
    borderBottomWidth: 5,
    borderBottomColor: 'aqua',
    borderLeftWidth: 5,
    borderLeftColor: 'aqua',
    // borderRightWidth: 50,
    // borderRightColor: 'transparent',
    height: 30,
    width: 30,
    opacity: 0.5
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#000',
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  zoomText: {
    position: 'absolute',
    bottom: 70,
    zIndex: 2,
    left: 2,
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#FFD700',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  text: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#F00',
    justifyContent: 'center',
  },
  textBlock: {
    color: '#F00',
    position: 'absolute',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});

export default App;
