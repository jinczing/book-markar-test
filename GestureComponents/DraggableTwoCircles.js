import React from 'react';
import { PinchGestureHandler, PanGestureHandler, TapGestureHandler, State } from 'react-native-gesture-handler';
import { Animated, StyleSheet, View, ART } from 'react-native';

const { Surface, Shape, Group } = ART;

const BORDERWIDTH = 2;

class DraggableTwoCircles extends React.Component {

    panRef = React.createRef();
    panRef2 = React.createRef();

    constructor(props) {
        super(props);

        

        // pan
        this.translateX = new Animated.Value(0);
        this.transX = this.translateX.interpolate({
            inputRange: [0, 500],
            outputRange: [0, 1]
        })
        this.strokeWidth = this.translateX.interpolate({
            inputRange: [-500, 0, 500],
            outputRange: [50, 1, 50]
        })

        

        this.translateY = new Animated.Value(0);
        this.lastOffSet = { x: 0, y: 0 };
        this.test = new Animated.Value(0);

        this.onTiltGestureEvent = Animated.event(
            [ { nativeEvent: {

                translationX: this.translateX,
                translationY: this.translateY,

            } } ]
        );

        // pan2
        this.translateX2 = new Animated.Value(0);
        this.translateY2 = new Animated.Value(0);
        this.lastOffSet2 = { x: 0, y: 0 };
        

        this.onTiltGestureEvent2 = Animated.event(
            [ { nativeEvent: {

                translationX: this.translateX2,
                translationY: this.translateY2,

            } }, this.handleEvent ]
        );

        // linkage
        this.scaleX = Animated.add(Animated.divide(Animated.subtract(this.translateX, this.translateX2), new Animated.Value(100)), new Animated.Value(1));
        this.posX = Animated.add(this.translateX2, Animated.divide(Animated.multiply(Animated.subtract(this.scaleX, new Animated.Value(1)), new Animated.Value(100)), new Animated.Value(2)))
        //this.scaleY = Animated.add(Animated.divide(Animated.subtract(this.translateY2, this.translateY), new Animated.Value(80)), new Animated.Value(1));
        this.scaleY = Animated.add(Animated.divide(Animated.subtract(Animated.add(this.translateY2, new Animated.Value(0)), Animated.subtract(this.translateY, new Animated.Value(0))), new Animated.Value(80)), new Animated.Value(1));
        this.posY = Animated.subtract(this.translateY2, Animated.divide(Animated.multiply(Animated.subtract(this.scaleY, new Animated.Value(1)), new Animated.Value(80)), new Animated.Value(2)))
        
    }

    handleEvent = () => {
        console.warn("handleEvent");
    }

    

    onTiltGestureStateChange = event => {
        if(event.nativeEvent.oldState === State.ACTIVE) {
 
            this.lastOffSet.x += event.nativeEvent.translationX;
            this.lastOffSet.y += event.nativeEvent.translationY;
            this.translateX.setOffset(this.lastOffSet.x);
            this.translateX.setValue(0);
            this.translateY.setOffset(this.lastOffSet.y);
            this.translateY.setValue(0);

            if(this.props.onChange != null)
                this.props.onChange();
        }
    };

    onTiltGestureStateChange2 = event => {
        if(event.nativeEvent.oldState === State.ACTIVE) {
 
            this.lastOffSet2.x += event.nativeEvent.translationX;
            this.lastOffSet2.y += event.nativeEvent.translationY;
            this.translateX2.setOffset(this.lastOffSet2.x);
            this.translateX2.setValue(0);
            this.translateY2.setOffset(this.lastOffSet2.y);
            this.translateY2.setValue(0);

            //console.warn(this.translateX2);

            if(this.props.onChange != null)
                this.props.onChange();
        }
    };

    render() {

        let txt = "M250 250, " + Math.round(this.translateX.__getValue()).toString() + " " + Math.round(this.translateY.__getValue()).toString();
        //console.warn(txt);

        return(
            <React.Fragment>
                <PanGestureHandler
                ref={this.panRef}
                onGestureEvent={this.onTiltGestureEvent}
                onHandlerStateChange={this.onTiltGestureStateChange}
                >
                
                
                <Animated.View style={[styles.transCircle,
                    {
                        transform: [
                            { translateX: this.translateX },
                            { translateY: this.translateY },
                        ],
                        position: 'relative',
                        left: 100,
                    }]}>
                        <View style={styles.circle}>

                        </View>
                        
                        
                        {/* <Surface width={500} height={500}>
                            
                            <Shape
                                d={txt}
                                stroke="#000"
                                strokeWidth={1}>

                            </Shape>
                    
                        </Surface> */}
                        

                </Animated.View>

                
                

                </PanGestureHandler>

                <PanGestureHandler
                ref={this.panRef2}
                onGestureEvent={this.onTiltGestureEvent2}
                onHandlerStateChange={this.onTiltGestureStateChange2}
                >

                <Animated.View style={[styles.transCircle,
                    {
                        transform: [
                            { translateX: this.translateX2 },
                            { translateY: this.translateY2 },
                        ]
                    }]}>
                        <View style={styles.circle}>

                        </View>


                </Animated.View>


                </PanGestureHandler>

                <Animated.View style={[styles.boxH1, {
                            transform: [
                                { translateX: this.posX },
                                { translateY: this.translateY2 },
                                { scaleX: this.scaleX }
                            ]
                        }]}>

                </Animated.View>

                <Animated.View style={[styles.boxH2, {
                            transform: [
                                { translateX: this.posX },
                                { translateY: this.translateY },
                                { scaleX: this.scaleX }
                            ]
                        }]}>

                </Animated.View>

                <Animated.View style={[styles.boxV1, {
                            transform: [
                                { translateX: this.translateX2 },
                                { translateY: this.posY },
                                { scaleY: this.scaleY },
                                { rotate: '270deg'}
                            ]
                        }]}>

                </Animated.View>

                <Animated.View style={[styles.boxV2, {
                            transform: [
                                { translateX: this.translateX },
                                { translateY: this.posY },
                                { scaleY: this.scaleY },
                                { rotate: '270deg'}
                            ]
                        }]}>

                </Animated.View>
                     
            </React.Fragment>

            

        );
    }
}
const circleRad = 20;
const circleHitbox = 4;
const borderWidth = BORDERWIDTH;

const styles = StyleSheet.create({
    trapezoid: {
      borderBottomWidth: 100,
      borderBottomColor: 'red',
      borderLeftWidth: 25,
      borderLeftColor: 'transparent',
      borderRightWidth: 25,
      borderRightColor: 'transparent',
      height: 0,
      width: 100  
    },
    boxH1: {
        height: borderWidth,
        width: 100,
        position: 'relative',
        left: 50,
        top: -40 - borderWidth/2,
        backgroundColor: "aqua",
        opacity: 1
    },
    boxH2: {
        height: borderWidth,
        width: 100,
        position: 'relative',
        left: 50,
        top: -borderWidth - 120 - borderWidth/2,
        backgroundColor: "aqua",
        opacity: 1
    },
    boxV1: {
        height: borderWidth,
        width: 80,
        position: 'relative',
        left: 0,
        top: -borderWidth*2 - 40 - borderWidth/2 - 40,
        backgroundColor: "aqua",
        opacity: 1
    },
    boxV2: {
        height: borderWidth,
        width: 80,
        position: 'relative',
        left: 100,
        top: -borderWidth*3 - 40 - borderWidth/2 - 40,
        backgroundColor: "aqua",
        opacity: 1
    },
    circle: {
        height: circleRad,
        width: circleRad,
        backgroundColor: 'aqua',
        borderRadius: circleRad/2,
        position: 'relative',
        left: circleRad*circleHitbox/2 - circleRad/2,
        top: circleRad*circleHitbox/2 - circleRad/2,
        opacity: 1
    },
    transCircle: {
        height: circleRad*circleHitbox,
        width: circleRad*circleHitbox,
        borderRadius: circleRad*circleHitbox/2,
        // position: 'relative',
        // left: circleRad*circleHitbox/2*(-1),
        // top: circleRad*circleHitbox/2*(-1),
        backgroundColor: 'red',
        opacity: 0.5
        
    }
})

export default DraggableTwoCircles;