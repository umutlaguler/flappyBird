import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import entities from './entities';
import Physics from './physics';
import WaveForm from 'react-native-audiowaveform';


export default function App() {
  playAudio=()=>{
    console.log("salfsldflskdfjsldfslşdfksşdlf");
    return(
      <WaveForm 

          style = {{
            width:'100%',
            height:20
          }}
          play={true}
          source={require('./components/sesBir.mp3')}  

      >
      </WaveForm>
      )
  }
  const [running, setRunning] = useState(false)
  const [gameEngine, setGameEngine] = useState(null)
  const [currentPoints, setCurrentPoints] = useState(0)
  
  useEffect(() => {
    setRunning(true)
  }, [])
  return (
    <View style={{ flex:1 }}>
      <Text style = {{ textAlign:'center', fontSize:40, color:'black', marginTop:30}}>{currentPoints}</Text>
      <GameEngine
        ref={(ref) => { setGameEngine(ref) }}
        style={{ position:'absolute', top: 0, left: 0, right: 0, bottom: 0}}
        entities = {entities()}
        systems ={[Physics]}
        running = {running}
        onEvent = {(e) => {
          switch(e.type){
            case 'game_over':
              setRunning(false)
              gameEngine.stop()
              break;
            case 'new_point':
              this.playAudio()
              setCurrentPoints(currentPoints + 1)
              break;
          }
        }}
      >

      </GameEngine>
      {
        !running ? 
          <View style = {{flex: 1, justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity style={{alignItems:'center', justifyContent:'center', backgroundColor:'green', width:'50%', height:'8%'}}
                              onPress={()=> {
                                setCurrentPoints(0)
                                setRunning(true)
                                gameEngine.swap(entities())
                              }}
            >
              <Text style={{color:'white',fontWeight:'bold'}}>
                START GAME
              </Text>
            </TouchableOpacity>

          </View> : null
      }
      <StatusBar style="auto" hidden={true} />
    </View>
  );
}

