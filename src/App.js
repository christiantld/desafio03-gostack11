import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from "./services/api";

export default function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    async function loadRepos() {
      const response = await api.get("/repositories");
      setRepos(response.data);
    }
    loadRepos();
  }, []);

  async function handleLikeRepository(id) {
    // Implement "Like Repository" functionality
    const response = await api.post(`/repositories/${id}/like`);
    const likedRepo = response.data;

    const reposUpdated = repos.map((repo) => {
      return repo.id === id ? likedRepo : repo;
    });
    setRepos(reposUpdated);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repos}
          keyExtractor={(repos) => repos.id}
          renderItem={({ item: repos }) => (
            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{repos.title}</Text>
              <View style={styles.techsContainer}>
                {repos.techs.map((tech) => (
                  <Text key={tech} style={styles.tech}>
                    {tech}
                  </Text>
                ))}
              </View>
              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                  testID={`repository-likes-${repos.id}`}
                >
                  {repos.likes} curtida{repos.likes === 1 ? "" : "s"}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(repos.id)}
                // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                testID={`like-button-${repos.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#f1f1f1",
    padding: 20,
    flex: 1,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
    width: "100%",
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
