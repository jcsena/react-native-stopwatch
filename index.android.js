import React, {
    View,
    Text,
    TouchableHighlight,
    Image,
    AppRegistry,
    ScrollView,
    Component,
    StyleSheet
} from 'react-native';
import formatTime from 'minutes-seconds-milliseconds';
var LinearGradient = require('react-native-linear-gradient');


class Stopwatch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timeElapsed: null,
            running: false,
            startTime: null,
            laps: []
        };
    }


    render() {

        return (
            <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']}  style={styles.container}>

                    <View style={[styles.header]}>

                        <View style={ [styles.timerWrapper]}>
                            <Text style={styles.timer}>{this.dateToMilliseconds(this.state.timeElapsed)}</Text>
                        </View>

                        <View style={[ styles.buttonWrapper]}>
                            {this.startStopButton()}
                            {this.lapButton()}
                        </View>

                    </View>
                    


                    <View style={[styles.footer]}>
                        <ScrollView stickyHeaderIndices={[]}>
                            {this.laps()}
                        </ScrollView>
                    </View>
            </LinearGradient>

        )
    }

    laps() {
        return this.state.laps.map((time, index)=> {
            return (
                <View style={styles.lapsWrapper} key={index}>
                    <Text style={styles.lapText}>Lap {index + 1}</Text>
                    <Text style={styles.lapText}>{formatTime(time)}</Text>
                </View>
            )
        })
    }

    startStopButton() {

        var buttonStyle = styles.buttonStart;
        var buttonTextStyle =  styles.buttonTextStart;
        if (this.state.running) {
            buttonStyle = styles.buttonStop;
            buttonTextStyle = styles.buttonTextStop;
        }

        return (
            <TouchableHighlight underlayColor="gray" style={[buttonStyle,styles.button]}
                                onPress={this.handleStartPress.bind(this)}>
                <Text style={[styles.buttonText, buttonTextStyle]}>{this.state.running ? 'Stop' : 'Start'}</Text>
            </TouchableHighlight>
        )
    }

    lapButton() {
        return (
            <TouchableHighlight onPress={this.handleLapPress.bind(this)} underlayColor="gray" style={styles.button}>
                <Text style={[styles.buttonText]}>Lap</Text>
            </TouchableHighlight>
        )
    }

    handleStartPress() {

        if (this.state.running) {
            clearInterval(this.interval);
            this.setState({
                running: false
            });
            return;
        }

        this.setState({
            startTime: new Date()
        });

        this.interval = setInterval(() => {
            this.setState({
                timeElapsed: new Date() - this.state.startTime,
                running: true
            });
        }, 30);

    }

    handleLapPress() {

        var lap = this.state.timeElapsed;

        this.setState({
            startTime: new Date(),
            laps: this.state.laps.concat(lap)
        });
    }


    dateToMilliseconds(date) {

        return formatTime(date);
    }

    border(color) {
        return {
            borderColor: color,
            borderWidth: 4
        }
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
    },
    header: {
        flex: 3
    },
    footer: {
        flex: 2
    },
    timerWrapper: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    buttonWrapper: {
        flex: 7,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    timer: {
        fontSize: 60
    },
    button: {
        height: 90,
        width: 90,
        borderWidth: 8,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonTextStart: {
        color: '#03cb02'
    },
    buttonStart: {
        borderColor: '#03cb02'
    },

    buttonStop: {
        borderColor: '#ff4242'
    },
    buttonTextStop: {
        color: '#ff4242'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '400'
    },

    lapsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    lapText: {
        fontSize: 25,
        color: '#ffffff'
    }


});

AppRegistry.registerComponent('stopwatch', () => Stopwatch);
