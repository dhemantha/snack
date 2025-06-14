import React from 'react';
import { TouchableOpacity, StyleSheet, View, Dimensions } from 'react-native';
import { Card, Text } from '@ui-kitten/components';
import { ServiceCategory } from '@/types';
import { Wrench, Zap, Hammer, Sparkles, Flower2, Brush, Fan, Car } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ServiceCategoryCardProps {
  category: ServiceCategory;
  onPress: (category: ServiceCategory) => void;
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2; // 2 columns with padding

const iconMap = {
  wrench: Wrench,
  zap: Zap,
  hammer: Hammer,
  sparkles: Sparkles,
  flower: Flower2,
  brush: Brush,
  fan: Fan,
  car: Car,
};

export const ServiceCategoryCard: React.FC<ServiceCategoryCardProps> = ({ category, onPress }) => {
  const IconComponent = iconMap[category.icon as keyof typeof iconMap];

  const getGradientColors = (color: string) => {
    const gradients: { [key: string]: string[] } = {
      '#3366FF': ['#667EEA', '#764BA2'],
      '#FFAA00': ['#FFD700', '#FF8C00'],
      '#8B4513': ['#D2691E', '#8B4513'],
      '#00E096': ['#00E096', '#00C851'],
      '#00C851': ['#4CAF50', '#2E7D32'],
      '#FF6B35': ['#FF6B35', '#E53E3E'],
      '#0099CC': ['#00BCD4', '#0097A7'],
      '#DD2C00': ['#FF5722', '#D32F2F'],
    };
    return gradients[color] || [color, color];
  };

  return (
    <TouchableOpacity 
      onPress={() => onPress(category)}
      style={[styles.container, { width: cardWidth }]}
    >
      <Card style={styles.card}>
        <LinearGradient
          colors={getGradientColors(category.color)}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <IconComponent size={28} color="white" strokeWidth={2} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.name}>{category.name}</Text>
              <Text style={styles.count}>{category.count} providers</Text>
            </View>
          </View>
        </LinearGradient>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  gradient: {
    padding: 20,
    minHeight: 120,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  count: {
    color: 'white',
    fontSize: 12,
    opacity: 0.9,
    fontWeight: '500',
  },
});