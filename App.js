import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import axios from "axios";
const url = "https://breaking-bad-quotes.herokuapp.com/v1/quotes";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { author: "", quote: "" };
    this.onPress = this.onPress.bind(this);
  }

  async fetchData() {
    axios
      .get(url)
      .then(res => {
        if (res.data[0]) {
          const { quote, author } = res.data[0];
          this.setState({ quote, author });
        }
      })
      .catch(function(error) {
        console.error("error:", error);
      });
  }

  onPress() {
    this.updateQuote();
  }
  async updateQuote() {
    await this.fetchData();
  }

  componentDidMount() {
    this.updateQuote();
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.onPress}
        underlayColor={"none"}
      >
        <ImageBackground
          style={{
            height: "100%",
            borderWidth: 1,
            borderColor: "#000",
            backgroundColor: "#000",
            justifyContent: "flex-end",
            alignItems: "center"
          }}
          source={{
            uri:
              "https://m.media-amazon.com/images/M/MV5BMjhiMzgxZTctNDc1Ni00OTIxLTlhMTYtZTA3ZWFkODRkNmE2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY1200_CR116,0,630,1200_AL_.jpg"
          }}
        >
          <View>
            <Text style={styles.paragraph}>"{this.state.quote}"</Text>
            <Text style={styles.paragraph}>{this.state.author} </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    paddingTop: 20,
    backgroundColor: "#000"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "right"
  }
});
