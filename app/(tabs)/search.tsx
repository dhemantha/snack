import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, FlatList } from 'react-native';
import { Layout, Text, Input, Button, Divider } from '@ui-kitten/components';
import { Search, Clock, X, TrendingUp } from 'lucide-react-native';
import { ProviderCard } from '@/components/ProviderCard';
import { allProviders } from '@/data/mockData';
import { ServiceProvider, SearchHistory } from '@/types';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ServiceProvider[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([
    { id: '1', query: 'plumber near me', timestamp: new Date(Date.now() - 86400000) },
    { id: '2', query: 'electrician emergency', timestamp: new Date(Date.now() - 172800000) },
    { id: '3', query: 'house cleaning service', timestamp: new Date(Date.now() - 259200000) },
  ]);
  const [isSearching, setIsSearching] = useState(false);

  const popularSearches = [
    'Emergency plumber',
    'House cleaning',
    'Electrician near me',
    'Handyman services',
    'Landscaping',
    'Painter',
  ];

  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const results = allProviders.filter(provider =>
        provider.name.toLowerCase().includes(query.toLowerCase()) ||
        provider.specialty.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      setIsSearching(false);

      // Add to search history
      if (query.trim()) {
        const newHistoryItem: SearchHistory = {
          id: Date.now().toString(),
          query: query.trim(),
          timestamp: new Date(),
        };
        setSearchHistory(prev => [newHistoryItem, ...prev.slice(0, 4)]);
      }
    }, 500);
  };

  const handleProviderPress = (provider: ServiceProvider) => {
    console.log('Provider pressed:', provider.name);
    // Navigate to provider details
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  const handleHistoryItemPress = (query: string) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  const handlePopularSearchPress = (query: string) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  const renderSearchIcon = () => (
    <Search size={20} color="#8F9BB3" />
  );

  const renderClearIcon = () => (
    searchQuery ? (
      <X 
        size={20} 
        color="#8F9BB3" 
        onPress={() => {
          setSearchQuery('');
          setSearchResults([]);
          setIsSearching(false);
        }} 
      />
    ) : null
  );

  return (
    <Layout style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text category="h4" style={styles.title}>Search Services</Text>
        <Text category="s1" appearance="hint" style={styles.subtitle}>
          Find the perfect service provider for your needs
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search for services or providers..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={() => handleSearch(searchQuery)}
          accessoryLeft={renderSearchIcon}
          accessoryRight={renderClearIcon}
          style={styles.searchInput}
          size="large"
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Results */}
        {searchQuery && (
          <View style={styles.section}>
            <Text category="h6" style={styles.sectionTitle}>
              {isSearching ? 'Searching...' : `${searchResults.length} results found`}
            </Text>
            {searchResults.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                onPress={handleProviderPress}
              />
            ))}
            {searchResults.length === 0 && !isSearching && searchQuery && (
              <View style={styles.emptyContainer}>
                <Text category="s1" appearance="hint">
                  No providers found for "{searchQuery}"
                </Text>
                <Text category="c1" appearance="hint" style={styles.emptySubtext}>
                  Try adjusting your search terms
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Search History */}
        {!searchQuery && searchHistory.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text category="h6" style={styles.sectionTitle}>Recent Searches</Text>
              <Button
                appearance="ghost"
                size="small"
                onPress={clearSearchHistory}
              >
                Clear All
              </Button>
            </View>
            {searchHistory.map((item) => (
              <View key={item.id} style={styles.historyItem}>
                <Clock size={16} color="#8F9BB3" />
                <Text
                  category="s1"
                  style={styles.historyText}
                  onPress={() => handleHistoryItemPress(item.query)}
                >
                  {item.query}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Popular Searches */}
        {!searchQuery && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <TrendingUp size={20} color="#3366FF" />
              <Text category="h6" style={styles.sectionTitle}>Popular Searches</Text>
            </View>
            <View style={styles.popularContainer}>
              {popularSearches.map((search, index) => (
                <Button
                  key={index}
                  appearance="outline"
                  size="small"
                  style={styles.popularButton}
                  onPress={() => handlePopularSearchPress(search)}
                >
                  {search}
                </Button>
              ))}
            </View>
          </View>
        )}

        <Divider style={styles.divider} />

        {/* Search Tips */}
        {!searchQuery && (
          <View style={styles.section}>
            <Text category="h6" style={styles.sectionTitle}>Search Tips</Text>
            <View style={styles.tipsContainer}>
              <Text category="s2" appearance="hint" style={styles.tip}>
                • Try specific service names like "emergency plumber"
              </Text>
              <Text category="s2" appearance="hint" style={styles.tip}>
                • Include location for better results
              </Text>
              <Text category="s2" appearance="hint" style={styles.tip}>
                • Use provider names for direct search
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 24,
  },
  title: {
    fontWeight: '700',
    color: '#222B45',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    borderRadius: 12,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontWeight: '600',
    flex: 1,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F7F9FC',
    gap: 12,
  },
  historyText: {
    flex: 1,
    color: '#3366FF',
  },
  popularContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  popularButton: {
    marginBottom: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptySubtext: {
    marginTop: 8,
  },
  divider: {
    marginVertical: 16,
    marginHorizontal: 16,
  },
  tipsContainer: {
    paddingLeft: 8,
  },
  tip: {
    marginBottom: 8,
    lineHeight: 20,
  },
});