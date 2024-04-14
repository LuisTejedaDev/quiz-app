import { StyleSheet, Text, View } from "react-native"
import { primary, secondary } from "../utils/colors"

export default ({seconds}) => {
    return(
       <View style={styles.container}>
                        
            <View style={styles.timerContainer}>

                <View style={styles.timer}>

                    <Text style={styles.time}>{seconds}</Text>

                </View>

                <View style={{height: 40, width: 65, position: 'absolute', bottom: 0, backgroundColor: secondary, zIndex: 0}}/>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center'
    },
    timerContainer: {
        height: 65,
        width: 65,
        borderRadius: 65,
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        overflow: 'hidden'
    },
    timer: {
        height: '93%',
        width: '93%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: primary,
        borderRadius: 100,
        zIndex: 10
    },
    time: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    }
})