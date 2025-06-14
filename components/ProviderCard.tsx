import React from 'react';
import { TouchableOpacity, StyleSheet, View, Dimensions } from 'react-native';
import { Card, Text, Avatar } from '@ui-kitten/components';
import { ServiceProvider } from '@/types';
import { Star, MapPin, Clock, CheckCircle, Zap } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ProviderCardProps {
  provider: ServiceProvider;
  onPress: (provider: ServiceProvider) => void;
  compact?: boolean;
}

const { width } = Dimensions.get('window');

export const ProviderCard: React.FC<ProviderCardProps> = ({ provider, onPress, compact = false }) => {
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return '#26CB82';
      case 'busy': return '#FF9A26';
      case 'offline': return '#EF2626';
      default: return '#64748B';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available': return 'Available Now';
      case 'busy': return 'Busy';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  const getPriceColor = (priceRange: string) => {
    switch (priceRange) {
      case '$': return '#26CB82';
      case '$$': return '#FF9A26';
      case '$$$': return '#EF2626';
      default: return '#64748B';
    }
  };

  return (
    <TouchableOpacity onPress={() => onPress(provider)}>
      <Card style={[styles.card, compact && styles.compactCard]}>
        <View style={styles.header}>
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <Avatar
                source={{ uri: provider.avatar }}
                size="large"
                style={styles.avatar}
              />
              {provider.verified && (
                <View style={styles.verifiedBadge}>
                  <CheckCircle size={16} color="#26CB82" fill="#26CB82" />
                </View>
              )}
            </View>
            
            <View style={[styles.statusBadge, { backgroundColor: getAvailabilityColor(provider.availability) }]}>
              <Text style={styles.statusText}>{getAvailabilityText(provider.availability)}</Text>
            </View>
          </View>

          <View style={styles.providerInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{provider.name}</Text>
              <View style={[styles.priceBadge, { backgroundColor: `${getPriceColor(provider.priceRange)}20` }]}>
                <Text style={[styles.priceText, { color: getPriceColor(provider.priceRange) }]}>
                  {provider.priceRange}
                </Text>
              </View>
            </View>
            
            <Text style={styles.specialty}>{provider.specialty}</Text>
            
            <View style={styles.ratingContainer}>
              <Star size={14} color="#FFD700" fill="#FFD700" />
              <Text style={styles.rating}>
                {provider.rating} ({provider.reviewCount} reviews)
              </Text>
            </View>
            
            <View style={styles.locationContainer}>
              <MapPin size={12} color="#64748B" />
              <Text style={styles.location}>
                {provider.location} • {provider.distance}km away
              </Text>
            </View>
          </View>
        </View>

        {!compact && (
          <View style={styles.footer}>
            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <Clock size={14} color="#4DA6F2" />
                <Text style={styles.statText}>Response: {provider.responseTime}</Text>
              </View>
              <View style={styles.stat}>
                <Zap size={14} color="#26CB82" />
                <Text style={styles.statText}>{provider.completedJobs} jobs completed</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.contactButton}>
              <LinearGradient
                colors={['#4DA6F2', '#667EEA']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Contact Now</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  compactCard: {
    marginHorizontal: 12,
    width: width * 0.85,
  },
  header: {
    flexDirection: 'row',
    padding: 20,
  },
  avatarSection: {
    alignItems: 'center',
    marginRight: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: 'white',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 80,
    alignItems: 'center',
  },
  statusText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  providerInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    flex: 1,
  },
  priceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priceText: {
    fontSize: 12,
    fontWeight: '700',
  },
  specialty: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  rating: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: '600',
    color: '#1E293B',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    marginLeft: 6,
    fontSize: 12,
    color: '#64748B',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    marginTop: 8,
    paddingTop: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  contactButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
  },
});