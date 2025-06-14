import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Layout, Text, Input, Select, SelectItem, IndexPath } from '@ui-kitten/components';
import { Search, Filter, TrendingUp, Users, Clock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ServiceCategoryCard } from '@/components/ServiceCategoryCard';
import { serviceCategories } from '@/data/mockData';
import { ServiceCategory } from '@/types';

const { width } = Dimensions.get('window');

export default function CategoriesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const [filteredCategories, setFilteredCategories] = useState(serviceCategories);

  const sortOptions = ['All Categories', 'Most Popular', 'A-Z', 'Provider Count'];

  const handleCategoryPress = (category: ServiceCategory) => {
    console.log('Category pressed:', category.name);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredCategories(serviceCategories);
    } else {
      const filtered = serviceCategories.filter(category =>
        category.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  };

  const handleSortChange = (index: IndexPath) => {
    setSelectedIndex(index);
    const sortType = sortOptions[index.row];
    
    let sorted = [...filteredCategories];
    switch (sortType) {
      case 'Most Popular':
        sorted.sort((a, b) => b.count - a.count);
        break;
      case 'A-Z':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Provider Count':
        sorted.sort((a, b) => b.count - a.count);
        break;
      default:
        sorted = serviceCategories.filter(cat =>
          cat.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    setFilteredCategories(sorted);
  };

  const renderSearchIcon = () => (
    <Search size={20} color="#64748B" />
  );

  const renderFilterIcon = () => (
    <Filter size={20} color="#64748B" />
  );

  const categoryStats = [
    { icon: TrendingUp, label: 'Trending', value: '12', color: '#4DA6F2' },
    { icon: Users, label: 'Total Providers', value: '340+', color: '#26CB82' },
    { icon: Clock, label: 'Avg Response', value: '45min', color: '#FF9A26' },
  ];

  return (
    <Layout style={styles.container}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={['#26CB82', '#4DA6F2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <Text style={styles.titleText}>Service Categories</Text>
          <Text style={styles.subtitleText}>
            Discover {serviceCategories.length} amazing services
          </Text>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Search and Filter */}
        <View style={styles.controlsContainer}>
          <View style={styles.searchContainer}>
            <Input
              placeholder="Search categories..."
              value={searchQuery}
              onChangeText={handleSearch}
              accessoryLeft={renderSearchIcon}
              style={styles.searchInput}
            />
          </View>
          
          <View style={styles.filterContainer}>
            <Select
              selectedIndex={selectedIndex}
              onSelect={handleSortChange}
              value={sortOptions[selectedIndex.row]}
              accessoryLeft={renderFilterIcon}
              style={styles.sortSelect}
            >
              {sortOptions.map((option, index) => (
                <SelectItem key={index} title={option} />
              ))}
            </Select>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {categoryStats.map((stat, index) => (
            <TouchableOpacity key={index} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                <stat.icon size={18} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Categories Grid */}
        <View style={styles.categoriesSection}>
          {filteredCategories.length > 0 ? (
            <View style={styles.categoriesGrid}>
              {filteredCategories.map((category) => (
                <ServiceCategoryCard
                  key={category.id}
                  category={category}
                  onPress={handleCategoryPress}
                />
              ))}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIcon}>
                <Search size={48} color="#CBD5E1" />
              </View>
              <Text style={styles.emptyTitle}>No categories found</Text>
              <Text style={styles.emptySubtitle}>
                Try adjusting your search or filter criteria
              </Text>
            </View>
          )}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    paddingHorizontal: 20,
  },
  titleText: {
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitleText: {
    color: 'white',
    fontSize: 16,
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  controlsContainer: {
    paddingHorizontal: 20,
    marginTop: -20,
    marginBottom: 24,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    borderRadius: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  filterContainer: {
    flexDirection: 'row',
  },
  sortSelect: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 32,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: '#64748B',
    textAlign: 'center',
  },
  categoriesSection: {
    paddingHorizontal: 20,
  },
  categoriesGrid: {
    gap: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  bottomSpacing: {
    height: 100,
  },
});