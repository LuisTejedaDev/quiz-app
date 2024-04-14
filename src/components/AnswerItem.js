import { StyleSheet, Text, TouchableOpacity, View} from "react-native"
import { primary } from "../utils/colors"
import Material from 'react-native-vector-icons/MaterialCommunityIcons'

export default ({description, selected, correct, handleCheck, disabled}) => {
    return(
        <TouchableOpacity
            disabled={disabled}
            onPress={() => handleCheck()}
            style={[styles.item, {borderColor: selected ? primary : '#dadada', backgroundColor: !disabled ? '#fff' : '#f1f1f1'}]}>
            <View style={{flex: 1, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'flex-start'}}>
                <Text style={[styles.description, {color: selected ? primary : '#383838'}]}>{description}</Text>
            </View> 
            {
                (disabled && correct)
                &&
                    <View style={{height: '100%', width: 55, justifyContent: 'center', alignItems: 'center'}}>
                        <Material name={'check'} size={20} color={'green'}/>
                    </View>
            }
        </TouchableOpacity>
    )
}
 
const styles = StyleSheet.create({
    item: {
        height: 55,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 10,
        borderWidth: 1.5,
        marginBottom: 10,
        borderRadius: 6,
        flexDirection: 'row'
    },
    description: {
        fontSize: 15,
        fontWeight: '500',
        color: '#fff'
    }
})