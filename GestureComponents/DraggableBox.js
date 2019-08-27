import React from 'react';
import { Animated, StyleSheet, ART, View } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { Surface, Shape, Group } = ART;

class DraggableBox extends React.Component {
    constructor(props) {
        super(props);

        // pan 1

        this.translateX1 = new Animated.Value(0);
        this.translateY1 = new Animated.Value(0);
        this.lastOffset1 = {x: 0, y: 0};

        this.onPanGestureEvent1 = Animated.event([
            {
                nativeEvent: {
                    translationX: this.translateX1,
                    translationY: this.translateY1
                }
            },
        ]);

        // pan 2

        this.translateX2 = new Animated.Value(0);
        this.translateY2 = new Animated.Value(0);
        this.lastOffset2 = {x: 0, y: 0};

        this.onPanGestureEvent2 = Animated.event([
            {
                nativeEvent: {
                    translationX: this.translateX2,
                    translationY: this.translateY2
                }
            },
        ]);

        // pan logic
        this.translateX1Limited = this.translateX1.interpolate({
            inputRange: [-1000, 0, this.translateX2.__getValue(), 1000],
            outputRange: [-1000, 0, this.translateX2.__getValue(), this.translateX2.__getValue()]
        });

    }

    onPanGestureStateChange1 = (event) => {
        if(event.nativeEvent.oldState === State.ACTIVE) {
            this.lastOffset1.x += event.nativeEvent.translationX;
            this.lastOffset1.y += event.nativeEvent.translationY;
            this.translateX1.setOffset(this.lastOffset1.x);
            this.translateX1.setValue(0);
            this.translateY1.setOffset(this.lastOffset1.y);
            this.translateY1.setValue(0);
        }
    }

    onPanGestureStateChange2 = (event) => {
        if(event.nativeEvent.oldState === State.ACTIVE) {
            this.lastOffset2.x += event.nativeEvent.translationX;
            this.lastOffset2.y += event.nativeEvent.translationY;
            this.translateX2.setOffset(this.lastOffset2.x);
            this.translateX2.setValue(0);
            this.translateY2.setOffset(this.lastOffset2.y);
            this.translateY2.setValue(0);
        }
    }


    

    render() {
        return(
            <React.Fragment>
                <PanGestureHandler
                onGestureEvent={this.onPanGestureEvent1}
                onHandlerStateChange={this.onPanGestureStateChange1}>
                    <Animated.View style={[styles.trapezoidBottomHitBox,
                        {
                            transform: [
                                { translateX: this.translateX1 },
                                { translateY: this.translateY1 }
                            ]
                        }
                    ]}>
                        <View style={[styles.trapezoidBottom]}>

                        </View>

                    </Animated.View>
                    
                </PanGestureHandler>

                <PanGestureHandler
                onGestureEvent={this.onPanGestureEvent2}
                onHandlerStateChange={this.onPanGestureStateChange2}>
                    <Animated.View style={[styles.trapezoidTopHitBox,
                        {
                            transform: [
                                { translateX: this.translateX2 },
                                { translateY: this.translateY2 }
                            ]
                        }
                    ]}>
                        <View style={styles.trapezoidTop}>

                        </View>

                    </Animated.View>

                </PanGestureHandler>
            </React.Fragment>

        );
    }
}

const borderWidth = 5;
const borderHitBoxWidth = 25

const styles = StyleSheet.create({
    trapezoidBottom: {
        borderBottomWidth: 5,
        borderBottomColor: 'aqua',
        borderLeftWidth: 5,
        borderLeftColor: 'aqua',
        height: 30,
        width: 30,
        opacity: 0.5,
        right: 10,
        bottom: 5
    },
    trapezoidBottomHitBox: {
        borderBottomWidth: 15,
        borderBottomColor: 'transparent',
        borderLeftWidth: 15,
        borderLeftColor: 'transparent',
        height: 30,
        width: 30,
    },
    trapezoidTop: {
        borderTopWidth: 5,
        borderTopColor: 'aqua',
        borderRightWidth: 5,
        borderRightColor: 'aqua',
        height: 30,
        width: 30,
        opacity: 0.5,
        left: 10,
        top: 5
    },
    trapezoidTopHitBox: {
        borderTopWidth: 15,
        borderTopColor: 'transparent',
        borderRightWidth: 15,
        borderRightColor: 'transparent',
        height: 30,
        width: 30,
    },
      
});

export default DraggableBox;