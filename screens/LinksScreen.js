import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native';

export default class LinksScreen extends React.Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('http://192.168.0.18:9000/message')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.messages,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <FlatList
          contentContainerStyle={{backgroundColor: '#000'}}
          data={this.state.dataSource}
          renderItem={({item}) => <Text style={styles.textUserColor}>
            {item.user}:
            <Text style={styles.textMessageColor}> {item.message}</Text>
          </Text>}
          keyExtractor={(item, index) => item.message}
        />
        <TextInput
          style={styles.textBox}
          placeholder="Send message"
          onChangeText={(text) => this.setState({text})}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#000',
  }, textUserColor: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 20
  }, textMessageColor: {
    color: 'white'
  }, textBox: {
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    borderTopColor: 'green'
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
   // paddingVertical: 5,
    // paddingHorizontal: 15,
    width: window.width - 30,
  }
});
