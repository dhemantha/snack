import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Layout, Text, Avatar, Button, Card, Divider, Toggle } from '@ui-kitten/components';
import { Settings, Bell, MapPin, Star, Calendar, Moon, Sun } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

export default function ProfileScreen() {
  const { isDark, toggleTheme } = useTheme();

  const profileStats = [
    { label: 'Bookings', value: '12' },
    { label: 'Reviews', value: '8' },
    { label: 'Saved', value: '15' },
  ];

  const menuItems = [
    { icon: Calendar, title: 'My Bookings', subtitle: 'View upcoming and past bookings' },
    { icon: Star, title: 'My Reviews', subtitle: 'Reviews you\'ve written' },
    { icon: MapPin, title: 'Addresses', subtitle: 'Manage saved addresses' },
    { icon: Bell, title: 'Notifications', subtitle: 'Manage your notifications' },
    { icon: Settings, title: 'Settings', subtitle: 'App preferences and privacy' },
  ];

  return (
    <Layout style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text category="h4" style={styles.title}>Profile</Text>
        </View>

        {/* Profile Info */}
        <Card style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <Avatar
              source={{ uri: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400' }}
              size="giant"
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text category="h5" style={styles.userName}>John Smith</Text>
              <Text category="s1" appearance="hint">john.smith@email.com</Text>
              <Text category="s2" appearance="hint" style={styles.memberSince}>
                Member since Jan 2024
              </Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            {profileStats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text category="h6" style={styles.statValue}>{stat.value}</Text>
                <Text category="c1" appearance="hint">{stat.label}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Theme Toggle */}
        <Card style={styles.themeCard}>
          <View style={styles.themeToggle}>
            <View style={styles.themeInfo}>
              {isDark ? <Moon size={20} color="#8F9BB3" /> : <Sun size={20} color="#FFAA00" />}
              <Text category="s1" style={styles.themeText}>
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </Text>
            </View>
            <Toggle checked={isDark} onChange={toggleTheme} />
          </View>
        </Card>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <View key={index}>
              <View style={styles.menuItem}>
                <item.icon size={20} color="#8F9BB3" />
                <View style={styles.menuItemContent}>
                  <Text category="s1" style={styles.menuItemTitle}>{item.title}</Text>
                  <Text category="c1" appearance="hint">{item.subtitle}</Text>
                </View>
              </View>
              {index < menuItems.length - 1 && <Divider style={styles.menuDivider} />}
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <Button 
            appearance="outline" 
            style={styles.actionButton}
            size="large"
          >
            Edit Profile
          </Button>
          <Button 
            appearance="ghost" 
            status="danger"
            style={styles.actionButton}
            size="large"
          >
            Sign Out
          </Button>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text category="c1" appearance="hint" style={styles.appVersion}>
            Version 1.0.0
          </Text>
          <View style={styles.appLinks}>
            <Text category="c1" style={styles.appLink}>Privacy Policy</Text>
            <Text category="c1" appearance="hint"> • </Text>
            <Text category="c1" style={styles.appLink}>Terms of Service</Text>
            <Text category="c1" appearance="hint"> • </Text>
            <Text category="c1" style={styles.appLink}>Help</Text>
          </View>
        </View>
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
  },
  profileCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: '700',
    marginBottom: 4,
  },
  memberSince: {
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F7F9FC',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontWeight: '700',
    marginBottom: 4,
  },
  themeCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  themeToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  themeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  themeText: {
    fontWeight: '500',
  },
  menuContainer: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EDF1F7',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontWeight: '500',
    marginBottom: 2,
  },
  menuDivider: {
    marginHorizontal: 16,
  },
  actionsContainer: {
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 32,
  },
  actionButton: {
    borderRadius: 12,
  },
  appInfo: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  appVersion: {
    marginBottom: 8,
  },
  appLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appLink: {
    color: '#3366FF',
  },
});