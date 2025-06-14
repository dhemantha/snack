import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { Layout, Text, Input, Card, Avatar } from '@ui-kitten/components';
import { Search, MapPin, Star, TrendingUp, Zap, Clock, ArrowRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ServiceCategoryCard } from '@/components/ServiceCategoryCard';
import { ProviderCard } from '@/components/ProviderCard';
import { serviceCategories, featuredProviders } from '@/data/mockData';
import { ServiceCategory, ServiceProvider } from '@/types';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryPress = (category: ServiceCategory) => {
    console.log('Category pressed:', category.name);
  };

  const handleProviderPress = (provider: ServiceProvider) => {
    console.log('Provider pressed:', provider.name);
  };

  const renderSearchIcon = () => (
    <Search size={20} color="#64748B" />
  );

  const quickStats = [
    { icon: TrendingUp, label: 'Active Services', value: '2.5K+', color: '#4DA6F2' },
    { icon: Star, label: 'Top Rated', value: '4.9★', color: '#26CB82' },
    { icon: Zap, label: 'Fast Response', value: '<30min', color: '#FF9A26' },
  ];

  return (
    <Layout style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header with Gradient */}
        <LinearGradient
          colors={['#667EEA', '#764BA2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <View style={styles.locationContainer}>
              <MapPin size={16} color="white" />
              <Text style={styles.locationText}>New York, NYy</Text>
            </View>
            <Text style={styles.welcomeText}>Find Your Perfect</Text>
            <Text style={styles.titleText}>Service Provider</Text>
          </View>
        </LinearGradient>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <Input
            placeholder="Search for services or providers..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            accessoryLeft={renderSearchIcon}
            style={styles.searchInput}
            size="large"
          />
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          {quickStats.map((stat, index) => (
            <TouchableOpacity key={index} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                <stat.icon size={20} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Service Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Services</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
              <ArrowRight size={16} color="#4DA6F2" />
            </TouchableOpacity>
          </View>
          <View style={styles.categoriesGrid}>
            {serviceCategories.slice(0, 6).map((category) => (
              <ServiceCategoryCard
                key={category.id}
                category={category}
                onPress={handleCategoryPress}
              />
            ))}
          </View>
        </View>

        {/* Featured Providers */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Rated Providers</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>View All</Text>
              <ArrowRight size={16} color="#4DA6F2" />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={featuredProviders}
            renderItem={({ item }) => (
              <ProviderCard
                provider={item}
                onPress={handleProviderPress}
                compact={true}
              />
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.providersContainer}
          />
        </View>

        {/* Emergency Service Banner */}
        <TouchableOpacity style={styles.emergencyBanner}>
          <LinearGradient
            colors={['#EF2626', '#F24D4D']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.emergencyGradient}
          >
            <View style={styles.emergencyContent}>
              <View style={styles.emergencyIcon}>
                <Zap size={24} color="white" />
              </View>
              <View style={styles.emergencyText}>
                <Text style={styles.emergencyTitle}>Emergency Service</Text>
                <Text style={styles.emergencySubtitle}>24/7 Available • Fast Response</Text>
              </View>
              <ArrowRight size={20} color="white" />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <Card style={styles.activityCard}>
            <View style={styles.activityItem}>
              <Avatar
                source={{ uri: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400' }}
                size="small"
              />
              <View style={styles.activityContent}>
                <Text style={styles.activityText}>Mike Johnson completed your plumbing service</Text>
                <View style={styles.activityMeta}>
                  <Clock size={12} color="#64748B" />
                  <Text style={styles.activityTime}>2 hours ago</Text>
                </View>
              </View>
              <View style={styles.activityRating}>
                <Star size={14} color="#FFD700" fill="#FFD700" />
                <Text style={styles.ratingText}>4.9</Text>
              </View>
            </View>
          </Card>
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
  scrollView: {
    flex: 1,
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
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationText: {
    marginLeft: 6,
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  welcomeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    opacity: 0.9,
  },
  titleText: {
    color: 'white',
    fontSize: 32,
    fontWeight: '700',
    marginTop: 4,
  },
  searchSection: {
    paddingHorizontal: 20,
    marginTop: -20,
    marginBottom: 24,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    color: '#4DA6F2',
    fontSize: 14,
    fontWeight: '600',
  },
  categoriesGrid: {
    paddingHorizontal: 20,
  },
  providersContainer: {
    paddingLeft: 20,
  },
  emergencyBanner: {
    marginHorizontal: 20,
    marginBottom: 32,
    borderRadius: 20,
    overflow: 'hidden',
  },
  emergencyGradient: {
    padding: 20,
  },
  emergencyContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emergencyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  emergencyText: {
    flex: 1,
  },
  emergencyTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  emergencySubtitle: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
  },
  activityCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityContent: {
    flex: 1,
    marginLeft: 12,
  },
  activityText: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '500',
    marginBottom: 4,
  },
  activityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#64748B',
  },
  activityRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFF4E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF9A26',
  },
  bottomSpacing: {
    height: 100,
  },
});