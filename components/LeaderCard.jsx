import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const LeaderCard = ({ name, age, party, level, photo, likes, dislikes }) => {
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [currentDislikes, setCurrentDislikes] = useState(dislikes);
  const [userLiked, setUserLiked] = useState(false);
  const [userDisliked, setUserDisliked] = useState(false);

  const handleLike = () => {
    if (userLiked) {
      setCurrentLikes(currentLikes - 1);
      setUserLiked(false);
    } else {
      if (userDisliked) {
        setCurrentDislikes(currentDislikes - 1);
        setUserDisliked(false);
      }
      setCurrentLikes(currentLikes + 1);
      setUserLiked(true);
    }
  };

  const handleDislike = () => {
    if (userDisliked) {
      setCurrentDislikes(currentDislikes - 1);
      setUserDisliked(false);
    } else {
      if (userLiked) {
        setCurrentLikes(currentLikes - 1);
        setUserLiked(false);
      }
      setCurrentDislikes(currentDislikes + 1);
      setUserDisliked(true);
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "federal":
        return "#e74c3c";
      case "provincial":
        return "#3498db";
      case "local":
        return "#2ecc71";
      default:
        return "#95a5a6";
    }
  };

  const getLevelLabel = (level) => {
    return level.charAt(0).toUpperCase() + level.slice(1);
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image source={photo} style={styles.photo} />
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.details}>
            Age: {age} • {party}
          </Text>
          <View
            style={[
              styles.levelBadge,
              { backgroundColor: getLevelColor(level) },
            ]}
          >
            <Text style={styles.levelText}>{getLevelLabel(level)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, userLiked && styles.likedButton]}
          onPress={handleLike}
        >
          <Icon
            name={userLiked ? "thumb-up" : "thumb-up-off-alt"}
            size={20}
            color={userLiked ? "#fff" : "#4caf50"}
          />
          <Text style={[styles.actionText, userLiked && styles.likedText]}>
            {currentLikes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, userDisliked && styles.dislikedButton]}
          onPress={handleDislike}
        >
          <Icon
            name={userDisliked ? "thumb-down" : "thumb-down-off-alt"}
            size={20}
            color={userDisliked ? "#fff" : "#f44336"}
          />
          <Text
            style={[styles.actionText, userDisliked && styles.dislikedText]}
          >
            {currentDislikes}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};



export default LeaderCard;
