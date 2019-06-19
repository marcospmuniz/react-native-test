import React, { Component } from "react";
import api from "../services/api";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";

export default class Main extends Component {
  static navigationOptions = {
    title: "Meu primeiro APP"
  };

  state = {
    productInfo: {},
    docs: [],
    page: 1
  };

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);
    const { docs, ...productInfo } = response.data;

    this.setState({
      docs: [...this.state.docs, ...docs],
      productInfo,
      page
    });
  };

  loadMore = () => {
    const { page, productInfo } = this.state;

    // já está na última página, não tem mais nada para carregar
    if (page === productInfo.pages) return;

    const pageNumber = page + 1;

    this.loadProducts(pageNumber);
  };

  /* na propriedade onPress do TouchableOpacity a linha abaixo
   * this.props.navigation.navigate("Product", { product: item} );
   * está chamado a página "Product" passando o parametro "product" com o valor
   * de "item" para a página chamada.
   */
  renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>

      <TouchableOpacity
        style={styles.productButton}
        onPress={() => {
          this.props.navigation.navigate("Product", { product: item });
        }}
      >
        <Text style={styles.productButtonText}>Acessar</Text>
      </TouchableOpacity>
    </View>
  );

  /* a propriedade onEndReached do FlatList é disparada sempre que chega ao
   * final da lista.
   * a propriedade onEndReachedThreshold do FlatList é o percentual de
   * aproximação do final da lista que desejamos que onEndReached seja
   * disparado (0.1 = 10% = quando estiver faltando 10% para terminar a lista);
   */
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.list}
          data={this.state.docs}
          keyExtractor={item => item._id}
          renderItem={this.renderItem}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.1}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa"
  },

  list: {
    padding: 20
  },

  productContainer: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 5,
    padding: 20,
    marginBottom: 20
  },

  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333"
  },

  productDescription: {
    fontSize: 16,
    color: "#999999",
    marginTop: 5,
    lineHeight: 24
  },

  productButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#DA552F",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },

  productButtonText: {
    fontSize: 16,
    color: "#DA552F",
    fontWeight: "bold"
  }
});
