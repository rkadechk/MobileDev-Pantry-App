// app/Recipe.tsx (for Expo project)
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';

const Recipe = () => {
  const [recipe, setRecipe] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock recipe for now instead of API call
    const fetchRecipe = async () => {
      setIsLoading(true);
      setTimeout(() => {
        setRecipe(
          "Spaghetti Carbonara: Cook pasta. In a bowl, mix eggs, parmesan, and pepper. Fry pancetta, combine all with pasta."
        );
        setIsLoading(false);
      }, 1000); // Mock delay
    };

    fetchRecipe();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Recipe Suggestions</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#333" />
      ) : recipe ? (
        <View style={styles.recipeBox}>
          <Text style={styles.subHeading}>Suggested Recipe:</Text>
          <Text style={styles.recipeText}>{recipe}</Text>
        </View>
      ) : (
        <Text>No recipe found as no items are expiring!</Text>
      )}
    </ScrollView>
  );
};

export default Recipe;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 18,
    marginBottom: 10,
    color: '#444',
  },
  recipeBox: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
  },
  recipeText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});
