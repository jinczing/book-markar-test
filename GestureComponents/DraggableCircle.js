import React from 'react';
import { PinchGestureHandler, PanGestureHandler, TapGestureHandler, State } from 'react-native-gesture-handler';
import { Animated, StyleSheet, View } from 'react-native';



class DraggableCircle extends React.Component {

    panRef = React.createRef();

    constructor(props) {
        super(props);

        

        // pan
        this.translateX = new Animated.Value(0);
        this.translateY = new Animated.Value(0);
        this.lastOffSet = { x: 0, y: 0 };
        this.test = new Animated.Value(0);

        this.onTiltGestureEvent = Animated.event(
            [ { nativeEvent: {

                translationX: this.translateX,
                translationY: this.translateY,

            } }, this.props.onChange ]
        );

        
        
    }

    // componentDidUpdate() {
    //     if(this.props.onChange != null)
    //         this.props.onChange();
    // }



    

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

    render() {
        return(
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
                    ]
                }]}>
                    <View style={styles.circle}>

                    </View>

                </Animated.View>


            </PanGestureHandler>

        );
    }
}
const circleRad = 20;
const circleHitbox = 4;

const styles = StyleSheet.create({
    
    circle: {
        height: circleRad,
        width: circleRad,
        backgroundColor: 'aqua',
        borderRadius: circleRad/2,
        position: 'relative',
        left: circleRad*circleHitbox/2 - circleRad/2,
        top: circleRad*circleHitbox/2 - circleRad/2,
        opacity: 0.5
    },
    transCircle: {
        height: circleRad*circleHitbox,
        width: circleRad*circleHitbox,
        borderRadius: circleRad*circleHitbox/2,
        position: 'relative',
        left: circleRad*circleHitbox/2*(-1),
        top: circleRad*circleHitbox/2*(-1),
        
    }
})

export default DraggableCircle;