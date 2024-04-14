import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {questions} from "./utils/data"
import {primary} from "./utils/colors"
import {useEffect, useState} from "react"
import {AnswerItem, Timer} from "./components"

export default () => {

    const [isLastQuestion, setIsLastQuestion] = useState(false)
    const [numberQuestion, setNumberQuestion] = useState(0)

    const [finished, setFinished] = useState(false)
    const [enabled, setEnabled] = useState(false)
    const [percentage, setPercentage] = useState(100/questions.length)
    const [progressValue, setProgressValue] = useState(0)
    
    const [data, setData] = useState(questions)
    
    useEffect(() => {
        setIsLastQuestion(((numberQuestion + 1) !== data.length) ? false : true)
        setProgressValue(progressValue + percentage)
        setEnabled(false)
    }, [numberQuestion])

    useEffect(() => {
        if(data[numberQuestion].anwers.find(x => x.selected)) setEnabled(true)
    }, [data])

    const handleNext = () => {
        setNumberQuestion(numberQuestion + 1)
    }

    const handleFinish = () => { 
        setFinished(true)
        setNumberQuestion(0)
    }

    const handleCheck = (AnswerId) => {
        const nuevasPreguntas = data.map(
            x => x.id === (numberQuestion + 1) 
            ? 
                ({
                    ...x, 
                    anwers: x.anwers.map(y => y.id === AnswerId ? ({...y, selected: true}) : ({...y, selected: false}))
                })
            :
                x
        )
        setData(nuevasPreguntas)
    }

    return(
        <>
            <SafeAreaView style={{backgroundColor: primary}}/>
            <View style={styles.container}>

                <View style={[styles.header, {height: '25%'}]}>

                    <View style={[styles.progressContainer]}>

                        <TouchableOpacity
                            disabled={(isLastQuestion && !finished) || finished}
                            onPress={() => setNumberQuestion(numberQuestion + 1)}
                            style={[styles.lateralContainer, {alignItems: 'flex-start'}]}>
                            <Text style={[styles.controlTitle, {color: !finished ? isLastQuestion ? '#adadad' : '#fff' : 'transparent'}]}>Saltar</Text>
                        </TouchableOpacity>

                        <View style={styles.middleContainer}>
                            <View style={styles.bar}>
                                <View style={[styles.progress, {width: !finished ? `${progressValue}%` : '100%'}]} />
                            </View>
                        </View>

                        <View style={[styles.lateralContainer, {alignItems: 'flex-end'}]}>
                            <Text style={styles.controlTitle}>{`${numberQuestion + 1}/${questions.length}`}</Text>
                        </View>
                        
                    </View>

                    {/* <Timer seconds={data[numberQuestion]?.seconds}/> */}

                    <View style={styles.questionContainer}>
                        <Text style={styles.questionTitle}>{data[numberQuestion].question}</Text>
                    </View>
                </View>

                <View style={styles.main}>
                    {
                        data[numberQuestion].anwers?.map(x => 
                            <AnswerItem key={x.id} handleCheck={() => handleCheck(x.id)} disabled={finished} {...x}/>
                        )
                    }

                    {
                        finished
                        &&
                            <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', alignSelf: 'stretch'}}>
                                <View style={{backgroundColor: 'rgba(118, 71,180,0.2)', padding: 10}}>
                                    <Text style={{fontSize: 15, fontWeight: 'bold', color: primary}}>{data[numberQuestion].feedback}</Text>
                                </View>
                            </View>
                    } 
                </View>

                {
                    !finished
                    ?
                        <TouchableOpacity
                            disabled={!enabled}
                            style={[styles.button, {backgroundColor: enabled ? primary : '#adadad'}]}
                            onPress={() => (numberQuestion + 1) < data.length ? handleNext() : handleFinish()}    
                        >
                            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#fff'}}>{isLastQuestion ? 'Terminar' : 'Confirmar'}</Text>
                        </TouchableOpacity>
                    :
                        <TouchableOpacity
                            style={[styles.button, {backgroundColor: primary}]}
                            onPress={(numberQuestion + 1) < data.length ? () => handleNext() : () => {}}    
                        >
                            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#fff'}}>Continuar</Text>
                        </TouchableOpacity>
                }
            </View>
            <SafeAreaView style={{backgroundColor: primary}}/>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    header: {
        height: '40%',
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: primary,
        paddingHorizontal: 15
    },
    main: {
        flex: 1,
        alignSelf: 'stretch',
        padding: 15
    },
    progressContainer: {
        height: 55,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    questionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    questionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center'
    },
    button: {
        height: 50,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: primary,
        borderRadius: 8,
        margin: 15
    },
    middleContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bar: {
        height: 15,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 3,
    },
    progress: {
        height: '100%',
        width: '0%',
        borderRadius: 15,
        backgroundColor: primary
    },
    lateralContainer: {
        width: 70,
        height: '100%',
        justifyContent: 'center'
    },
    controlTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#fff'
    }
})