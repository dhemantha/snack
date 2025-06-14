import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Text, Button } from '@ui-kitten/components';
import { Heart, Star, MapPin, Clock, Trash2, Filter } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ProviderCard } from '@/components/ProviderCard';
import { featuredProviders } from '@/data/mockData';
import { ServiceProvider } from '@/types';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<ServiceProvider[]>(featuredProviders);
  const [filter, setFilter] = useState<'all' | 'available' | 'top-rated'>('all');

  const handleProviderPress = (provider: ServiceProvider) => {
    console.log('Provider pressed:', provider.name);
  };

  const handleRemoveFavorite = (providerId: string) => {
    setFavorites(prev => prev.filter(p => p.id !== providerId));
  };

  const filteredFavorites = favorites.filter(provider => {
    switch (filter) {
      case 'available':
        return provider.availability === 'available';
      case 'top-rated':
        return provider.rating >= 4.8;
      default:
        return true;
    }
  });

  const favoriteStats = [
    { label: 'Total Saved', value: favorites.length.toString(), color: '#EC4899' },
    { label: 'Available Now', value: favorites.filter(p => p.availability === 'available').length.toString(), color: '#26CB82' },
    { label: 'Top Rated', value: favorites.filter(p => p.rating >= 4.8).length.toString(), color: '#FFD700' },
  ];

  return (
    <Layout style={styles.container}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={['#EC4899', '#8B5CF6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Heart size={24} color="white" fill="white" />
          </View>
          <Text style={styles.titleText}>My Favorites</Text>
          <Text style={styles.subtitleText}>
            Your saved service providers
          </Text>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {favoriteStats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'all' && styles.activeFilterButton]}
            onPress={() => setFilter('all')}
          >
            <Text style={[styles.filterText, filter === 'all' && styles.activeFilterText]}>
              All ({favorites.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'available' && styles.activeFilterButton]}
            onPress={() => setFilter('available')}
          >
            <Text style={[styles.filterText, filter === 'available' && styles.activeFilterText]}>
              Available ({favorites.filter(p => p.availability === 'available').length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, filter === 'top-rated' && styles.activeFilterButton]}
            onPress={() => setFilter('top-rated')}
          >
            <Text style={[styles.filterText, filter === 'top-rated' && styles.activeFilterText]}>
              Top Rated ({favorites.filter(p => p.rating >= 4.8).length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Favorites List */}
        <View style={styles.favoritesSection}>
          {filteredFavorites.length > 0 ? (
            filteredFavorites.map((provider) => (
              <View key={provider.id} style={styles.favoriteItem}>
                <ProviderCard
                  provider={provider}
                  onPress={handleProviderPress}
                />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveFavorite(provider.id)}
                >
                  <Trash2 size={18} color="#EF2626" />
                </TouchableOpacity>
              </View>
            ))
          ) : favorites.length === 0 ? (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIcon}>
                <Heart size={48} color="#CBD5E1" />
              </View>
              <Text style={styles.emptyTitle}>No favorites yet</Text>
              <Text style={styles.emptySubtitle}>
                Start adding service providers to your favorites to see them here
              </Text>
              <Button
                style={styles.exploreButton}
                onPress={() => console.log('Navigate to categories')}
              >
                Explore Services
              </Button>
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIcon}>
                <Filter size={48} color="#CBD5E1" />
              </View>
              <Text style={styles.emptyTitle}>No providers match your filter</Text>
              <Text style={styles.emptySubtitle}>
                Try adjusting your filter criteria
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
    alignItems: 'center',
  },
  headerIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
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
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: -20,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 8,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  activeFilterButton: {
    backgroundColor: '#4DA6F2',
    borderColor: '#4DA6F2',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  activeFilterText: {
    color: 'white',
  },
  favoritesSection: {
    paddingHorizontal: 20,
  },
  favoriteItem: {
    position: 'relative',
    marginBottom: 16,
  },
  removeButton: {
    position: 'absolute',
    top: 16,
    right: 32,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 1,
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
    marginBottom: 24,
  },
  exploreButton: {
    borderRadius: 12,
    paddingHorizontal: 32,
  },
  bottomSpacing: {
    height: 100,
  },
});