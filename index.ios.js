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
// var LinearGradient = require('react-native-linear-gradient');
const {BlurView} = require('react-native-blur');

var uri = 'data:image/jpeg;base64,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';


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
            <Image source={{uri}} style={styles.container}>
                <BlurView blurType="light" style={styles.container}>

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
                </BlurView>
            </Image>

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
