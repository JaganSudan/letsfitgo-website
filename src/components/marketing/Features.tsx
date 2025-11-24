import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Trophy, Target, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Challenge Friends',
    description: 'Create and join fitness challenges with friends. Compete, motivate each other, and achieve your goals together.',
    color: 'blue',
  },
  {
    icon: Trophy,
    title: 'Track Your Score',
    description: 'Monitor your fitness score based on your activities. See how you rank on leaderboards and track your progress over time.',
    color: 'green',
  },
  {
    icon: Target,
    title: 'Stay Accountable',
    description: 'Set goals and stay accountable with daily check-ins. Get reminders and celebrate your achievements along the way.',
    color: 'purple',
  },
  {
    icon: TrendingUp,
    title: 'Real-time Leaderboards',
    description: 'See where you stand in real-time. Compete with friends and climb the ranks as you complete your fitness activities.',
    color: 'orange',
  },
];

const colorClasses = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  purple: 'bg-purple-100 text-purple-600',
  orange: 'bg-orange-100 text-orange-600',
};

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to keep you motivated and on track with your fitness goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${colorClasses[feature.color as keyof typeof colorClasses]} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

