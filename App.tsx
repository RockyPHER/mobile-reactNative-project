import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Book {
  id: number
  title: string
  author: string
  genre: string
}

export default function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentBookId, setCurrentBookId] = useState(1);

  useEffect(() => {
    getBooks()
  }, [])

  async function getBooks() {
    var response = await fetch("https://e7e9-2804-540-303-fe00-5329-3922-de4f-b66.ngrok.io/books/")
    var json = await response.json()
    setBooks(json)
  }

  function nextBook() {
    setCurrentBookId((currentBookId + 1) % books.length)
  }

  const book = books[currentBookId] || {} as Book

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={nextBook}><Text>NextBook</Text></TouchableOpacity>
      <View style={styles.subContainer}>
        <View style={styles.field}>
          <Text style={styles.label}>Title:</Text>
          <Text style={styles.value}>{book.title}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Author:</Text>
          <Text style={styles.value}>{book.author}</Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Genre:</Text>
          <Text style={styles.value}>{book.genre}</Text>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    display: 'flex',
    alignItems: 'flex-start',
  },

  button: {
    backgroundColor: 'lightgray',
    padding: 10,
    margin: 10,
  },

  field: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  label: {
    fontWeight: 'bold',
    padding: 5,
    backgroundColor: 'lightgray',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  value: {
    marginLeft: 10,
    border: 'solid',
    borderWidth: 1,
  }
});
