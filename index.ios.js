import React, {View, Text, TouchableHighlight, AppRegistry, ScrollView , Component, StyleSheet} from 'react-native';
import formatTime from 'minutes-seconds-milliseconds';


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
            <View style={styles.container}>

                <View style={[styles.header, this.border('yellow')]}>

                    <View style={ [styles.timerWrapper ,this.border('red')]}>
                        <Text style={styles.timer}>{this.dateToMilliseconds(this.state.timeElapsed)}</Text>
                    </View>

                    <View style={[ styles.buttonWrapper, this.border('green')]}>
                        {this.startStopButton()}
                        {this.lapButton()}
                    </View>

                </View>


                <View   style={[styles.footer]}>
                  <ScrollView stickyHeaderIndices={[]}>
                      {this.laps()}
                  </ScrollView>
                </View>

            </View>

        )
    }

    laps() {
        return this.state.laps.map((time, index)=> {
            return (
                <View style={styles.lapsWrapper} key={index}>
                    <Text style={styles.lapText}>Lap #{index + 1}</Text>
                    <Text style={styles.lapText}>Lap #{formatTime(time)}</Text>
                </View>
            )
        })
    }

    startStopButton() {

        var buttonStyle = this.state.running ? styles.buttonStop : styles.buttonStart;

        return (
            <TouchableHighlight underlayColor="gray" style={[buttonStyle,styles.button]}
                                onPress={this.handleStartPress.bind(this)}>
                <Text>{this.state.running ? 'Stop' : 'Start'}</Text>
            </TouchableHighlight>
        )
    }

    lapButton() {
        return (
            <TouchableHighlight onPress={this.handleLapPress.bind(this)} underlayColor="gray" style={styles.button}>
                <Text>Lap</Text>
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
        alignItems: 'stretch'
    },
    header: {
        flex: 1
    },
    footer: {
        flex: 1
    },
    timerWrapper: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonWrapper: {
        flex: 3,
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
        borderWidth: 2,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonStart: {
        borderColor: '#03cb02'
    },

    buttonStop: {
        borderColor: '#ff4242'
    },

    lapsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    lapText:{
        fontSize: 25
    }



});

AppRegistry.registerComponent('stopwatch', () => Stopwatch);
