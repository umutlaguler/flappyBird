import Matter from 'matter-js'
import React from 'react'
import { View,Image, Text } from 'react-native';

const Obstacle = props => {
    const widthBody = props.body.bounds.max.x - props.body.bounds.min.x
    const heightBody = props.body.bounds.max.y - props.body.bounds.min.y

    const xBody = props.body.position.x - widthBody /2
    const yBody = props.body.position.y - heightBody /2

    const color = props.color;
    return(
        <View style={{
            borderStyle: 'solid',
            position: 'absolute',
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heightBody,
            alignItems:'center',
            backgroundColor:'brown'
        }}>
        </View>
    )

}
export default (world, label, color, pos, size) => {
    const initialObstacle = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        size.width,
        size.height,
        {
            label: 'Obstacle',
            isStatic: true
    }
    )
    Matter.World.add(world, initialObstacle)
    return {
        body: initialObstacle,
        color,
        pos,
        renderer: <Obstacle/>
    }
}
