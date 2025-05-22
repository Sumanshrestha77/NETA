import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/MaterialIcons";

// Sample leader data
const leadersData = [
  {
    id: "1",
    name: "KP Sharma Oli",
    age: 73,
    party: "CPN-UML",
    level: "federal",
    likes: 1250,
    dislikes: 340,
  },
  {
    id: "2",
    name: "Pushpa Kamal Dahal",
    age: 70,
    party: "Maoist Centre",
    level: "federal",
    likes: 980,
    dislikes: 520,
  },
  {
    id: "3",
    name: "Sher Bahadur Deuba",
    age: 78,
    party: "Nepali Congress",
    level: "federal",
    likes: 1100,
    dislikes: 290,
  },
  {
    id: "4",
    name: "Ram Chandra Poudel",
    age: 79,
    party: "Nepali Congress",
    level: "federal",
    likes: 850,
    dislikes: 180,
  },
  {
    id: "5",
    name: "Madhav Kumar Nepal",
    age: 71,
    party: "CPN (Unified Socialist)",
    level: "federal",
    likes: 720,
    dislikes: 420,
  },
  {
    id: "6",
    name: "Yadav Chandra Sharma",
    age: 65,
    party: "CPN-UML",
    level: "provincial",
    likes: 450,
    dislikes: 120,
  },
  {
    id: "7",
    name: "Dormani Poudel",
    age: 58,
    party: "Nepali Congress",
    level: "provincial",
    likes: 380,
    dislikes: 95,
  },
  {
    id: "8",
    name: "Hikmat Kumar Karki",
    age: 62,
    party: "CPN-UML",
    level: "provincial",
    likes: 320,
    dislikes: 150,
  },
  {
    id: "9",
    name: "Rajendra Pandey",
    age: 55,
    party: "Maoist Centre",
    level: "provincial",
    likes: 290,
    dislikes: 180,
  },
  {
    id: "10",
    name: "Balen Shah",
    age: 33,
    party: "Independent",
    level: "local",
    likes: 2100,
    dislikes: 85,
  },
  {
    id: "11",
    name: "Harka Raj Sampang",
    age: 52,
    party: "RPP",
    level: "local",
    likes: 650,
    dislikes: 220,
  },
  {
    id: "12",
    name: "Gopal Hamal",
    age: 48,
    party: "Nepali Congress",
    level: "local",
    likes: 420,
    dislikes: 160,
  },
  {
    id: "13",
    name: "Sunita Dangol",
    age: 45,
    party: "CPN-UML",
    level: "local",
    likes: 380,
    dislikes: 90,
  },
];

// LeaderCard Component
const LeaderCard = ({ name, age, party, level, likes, dislikes }) => {
  const getLevelColor = (level) => {
    switch (level) {
      case "federal":
        return { backgroundColor: "#E3F2FD", color: "#1976D2" };
      case "provincial":
        return { backgroundColor: "#E8F5E8", color: "#388E3C" };
      case "local":
        return { backgroundColor: "#F3E5F5", color: "#7B1FA2" };
      default:
        return { backgroundColor: "#F5F5F5", color: "#757575" };
    }
  };

  const levelStyle = getLevelColor(level);

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.leftSection}>
          <View style={styles.avatar}>
            <Icon name="person" size={32} color="#757575" />
          </View>
          <View style={styles.leaderInfo}>
            <Text style={styles.leaderName}>{name}</Text>
            <Text style={styles.leaderDetails}>Age: {age}</Text>
            <Text style={styles.leaderDetails}>{party}</Text>
            <View
              style={[
                styles.levelBadge,
                { backgroundColor: levelStyle.backgroundColor },
              ]}
            >
              <Text style={[styles.levelText, { color: levelStyle.color }]}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.rightSection}>
          <View style={styles.voteContainer}>
            <Icon name="thumb-up" size={16} color="#4CAF50" />
            <Text style={styles.likeText}>{likes}</Text>
          </View>
          <View style={styles.voteContainer}>
            <Icon name="thumb-down" size={16} color="#F44336" />
            <Text style={styles.dislikeText}>{dislikes}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const LeadersScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");

  const handleMenuPress = () => {
    console.log("Menu pressed");
  };

  // Filter, search, and sort leaders
  const processedLeaders = useMemo(() => {
    let filtered = leadersData;

    // Apply level filter
    if (selectedFilter !== "all") {
      filtered = filtered.filter((leader) => leader.level === selectedFilter);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (leader) =>
          leader.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          leader.party.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "upvoted":
          return b.likes - a.likes;
        case "downvoted":
          return b.dislikes - a.dislikes;
        case "age":
          return b.age - a.age;
        default:
          return 0;
      }
    });

    return sorted;
  }, [selectedFilter, searchQuery, sortBy]);

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="person-outline" size={64} color="#BDBDBD" />
      <Text style={styles.emptyTitle}>No leaders found</Text>
      <Text style={styles.emptyMessage}>
        {searchQuery
          ? `No leaders match your search for "${searchQuery}"`
          : "No leaders available for the selected filter"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton}>
          <Icon name="menu" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>NETA</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon
          name="search"
          size={20}
          color="#757575"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search leaders or parties..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#BDBDBD"
        />
      </View>

      {/* Filter and Sort Controls */}
      <View style={styles.controlsContainer}>
        {/* Level Filter */}
        <View style={styles.controlItem}>
          <Text style={styles.controlLabel}>Filter by Level:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedFilter}
              style={styles.picker}
              onValueChange={setSelectedFilter}
            >
              <Picker.Item label="All Leaders" value="all" />
              <Picker.Item label="Federal" value="federal" />
              <Picker.Item label="Provincial" value="provincial" />
              <Picker.Item label="Local" value="local" />
            </Picker>
          </View>
        </View>

        {/* Sort By */}
        <View style={styles.controlItem}>
          <Text style={styles.controlLabel}>Sort by:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={sortBy}
              style={styles.picker}
              onValueChange={setSortBy}
            >
              <Picker.Item label="Name (A-Z)" value="name" />
              <Picker.Item label="Most Upvoted" value="upvoted" />
              <Picker.Item label="Most Downvoted" value="downvoted" />
              <Picker.Item label="Age (Oldest First)" value="age" />
            </Picker>
          </View>
        </View>
      </View>

      {/* Results Count */}
      <Text style={styles.countText}>
        Showing {processedLeaders.length} leader
        {processedLeaders.length !== 1 ? "s" : ""}
        {searchQuery && ` matching "${searchQuery}"`}
      </Text>

      {/* Leaders List */}
      <FlatList
        data={processedLeaders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LeaderCard
            name={item.name}
            age={item.age}
            party={item.party}
            level={item.level}
            likes={item.likes}
            dislikes={item.dislikes}
          />
        )}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  menuButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  placeholder: {
    width: 40,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  controlsContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  controlItem: {
    marginBottom: 12,
  },
  controlLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 4,
  },
  pickerContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  picker: {
    height: 50,
  },
  countText: {
    fontSize: 14,
    color: "#666",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 16,
  },
  leftSection: {
    flexDirection: "row",
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: "#F0F0F0",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  leaderInfo: {
    flex: 1,
  },
  leaderName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  leaderDetails: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  levelBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
  },
  levelText: {
    fontSize: 12,
    fontWeight: "500",
  },
  rightSection: {
    alignItems: "flex-end",
  },
  voteContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  likeText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4CAF50",
    marginLeft: 4,
  },
  dislikeText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#F44336",
    marginLeft: 4,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 32,
  },
});

export default LeadersScreen;
