import React, { Component } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo';
import rgba from 'hex-to-rgba';
import Icon from 'react-native-vector-icons';
// alternative for expo LinearGradient
// import LinearGradient  from 'react-native-linear-gradient';
var TimerMixin = require('react-timer-mixin');
var reactMixin = require('react-mixin');


import { connect } from 'react-redux';

import { Block, Badge, Card, Text, } from '../components';
import { styles as blockStyles } from '../components/Block';
import { styles as cardStyles } from '../components/Card';
import { theme, mocks } from '../constants';
import * as actions from '../Action';


const { width } = Dimensions.get('window');


class Welcome extends Component {
  
  static navigationOptions = {
    headerTitle: <Text style={theme.fonts.header}>Welcome</Text>,
    headerRight: (
      <TouchableOpacity>
        <Block flex={false}>
          <Image
            resizeMode="contain"
            source={require('../assets/images/Icon/Menu.png')}
            style={{ width: 20, height: 24 }}
          />
          <Badge
            size={13}
            color={theme.colors.accent}
            style={{ position: 'absolute', top: -4, right: -4 }}
          />
        </Block>
      </TouchableOpacity>
    )
  }
 
  componentWillMount(){
  
    
    this.setInterval(() => {

      this.props.dispatch(actions.get_usage_by_row());
      this.props.dispatch(actions.get_usage_by_id(this.props.counter));
    }, 5200);

    this.setInterval(() => {

      this.props.dispatch(actions.get_refill());
      this.props.dispatch(actions.get_refill_latest());
      console.log(this.props.latest)
     
    }, 10000);
    
    
}
  

  renderMonthly() {
    const { navigation } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Rewards")}
      >
        <Card shadow style={{ paddingVertical: theme.sizes.padding }}>
          <Image
            resizeMode="contain"
            source={require('../assets/images/Icon/More.png')}
            style={styles.moreIcon}
          />

          <Block>
            <Block center>
              <Text h1 primary spacing={1.7}>{Number(this.props.usage.Fuel_Information).toFixed(2)}</Text>
              <Text spacing={0.7}>Fuel Information</Text>
            </Block>

            <Block color="gray3" style={styles.hLine} />

            <Block row>
              <Block center>
                <Text size={20} spacing={0.6} primary style={{ marginBottom: 6 }}>{this.props.usage.TravelDistance}</Text>
                <Text body spacing={0.7}>Driving</Text>
                <Text body spacing={0.7}>Speed</Text>
              </Block>

              <Block flex={false} color="gray3" style={styles.vLine} />

              <Block center>
                <Text size={20} spacing={0.6} primary style={{ marginBottom: 6 }}>{Number(this.props.usage.Velocity).toFixed(2)}</Text>
                <Text body spacing={0.7}>Car's</Text>
                <Text body spacing={0.7}>Velocity</Text>
              </Block>
            </Block>
          </Block>
        </Card>
      </TouchableOpacity>
    )
  }

  renderAwards() {
    return (
      <LinearGradient
        end={{ x: 1, y: 0 }}
        style={[blockStyles.row, cardStyles.card, styles.awards ]}
        colors={["#FF988A", theme.colors.accent]}
      >
        <Block middle flex={0.4}>
          <Badge color={rgba(theme.colors.white, '0.2')} size={74}>
            <Badge color={rgba(theme.colors.white, '0.2')} size={52}>
              <Icon.FontAwesome name="trophy" color="white" size={theme.sizes.h2} />
            </Badge>
          </Badge>
        </Block>
        <Block middle>
          <Text size={theme.sizes.base} spacing={0.4} medium white>Last Refill!</Text>
          <Text size={theme.sizes.base} spacing={0.4} medium white>the refill value was {this.props.latest.Refill_value}</Text>
        </Block>
      </LinearGradient>
    )
  }

  renderTrip = trip => {
    return (  
      <Card shadow key={`trip-${trip._id}`}>
        <Block row space="between" style={{ marginBottom: theme.sizes.base }}>
          <Text spacing={0.5} caption>{trip.Date_index}</Text>
          <Text spacing={0.5} caption>{Number(trip.total_fuel_usage).toFixed(2)}</Text>
        </Block>
        <Block row center>
          <Badge color={rgba(theme.colors.accent, '0.2')} size={14} style={{ marginRight: 8 }}>
            <Badge color={theme.colors.accent} size={8} />  
          </Badge>
          <Text spacing={0.5} color="gray">Refill: {Number(trip.Refill_value).toFixed(2)} L</Text>
        </Block>

        <Block row center style={{ paddingVertical: 4 }}>
          <Badge color="gray2" size={4} style={{ marginLeft: 4.5 }} />
        </Block>
        
        <Block row center>
          <Badge color={rgba(theme.colors.primary, '0.2')} size={14} style={{ marginRight: 8 }}>
            <Badge color={theme.colors.primary} size={8} />  
          </Badge>
          <Text spacing={0.5} color="gray">Fuel Used: {Number(trip.After_refill_usage).toFixed(2)} L</Text>
        </Block>
      </Card>
    
    )
  }

  renderTrips() {
    return (
      <React.Fragment>
        <Block style={{ marginBottom: theme.sizes.base }}>
          <Text spacing={0.4} transform="uppercase">
            Recent Refills
          </Text>
        </Block>

        {this.props.refill.map(trip => this.renderTrip(trip))}
      </React.Fragment>
    )
  }

  renderTripButton() {
    const { navigation } = this.props;

    return (
      <Block center middle style={styles.startTrip}>
        <Badge color={rgba(theme.colors.primary, '0.1')} size={144}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("Trip")}>
            <Badge color={theme.colors.primary} size={62}>
              <Icon.FontAwesome name="automobile" size={62 / 2.5} color="white" />
            </Badge>
          </TouchableOpacity>
        </Badge>
      </Block>
    )
  }

  render() {
    return (
      <React.Fragment>
        <ScrollView style={styles.welcome} showsVerticalScrollIndicator={false}>
          {this.renderMonthly()}
          {this.renderAwards()}
          {this.renderTrips()}
        </ScrollView>
        {this.renderTripButton()}
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  welcome: {
    paddingVertical: theme.sizes.padding,
    paddingHorizontal: theme.sizes.padding,
    backgroundColor: theme.colors.gray4,
  },
  // horizontal line
  hLine: {
    marginVertical: theme.sizes.base * 2,
    marginHorizontal: theme.sizes.base * 2,
    height: 1,
  },
  // vertical line
  vLine: {
    marginVertical: theme.sizes.base / 2,
    width: 1,
  },
  awards: {
    padding: theme.sizes.base,
    marginBottom: theme.sizes.padding,
  },
  moreIcon: {
    width: 16,
    height: 17,
    position: 'absolute',
    right: theme.sizes.base,
    top: theme.sizes.base,
  },
  startTrip: {
    position: 'absolute',
    left: (width - 144) / 2,
    bottom: 0,
  }
})
function mapStateToProps(state){

  return{
      usage: state.usage.data,
      counter: state.counter.row,
      refill: state.refill.data,
      latest: state.latest.data
  }
}
reactMixin(Welcome.prototype, TimerMixin);

export default connect(mapStateToProps)(Welcome);