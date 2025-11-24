import { Card, CardContent } from '@/components/ui/card';
import { UserPlus, Calendar, Award } from 'lucide-react';

const steps = [
  {
    number: '1',
    icon: UserPlus,
    title: 'Join or Create a Challenge',
    description: 'Invite friends to join your fitness challenge or accept an invite to participate in theirs.',
  },
  {
    number: '2',
    icon: Calendar,
    title: 'Track Your Activities',
    description: 'Log your daily fitness activities and watch your score increase as you stay consistent.',
  },
  {
    number: '3',
    icon: Award,
    title: 'Compete & Win',
    description: 'Climb the leaderboard, compete with friends, and celebrate your achievements together.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started in three simple steps and transform your fitness journey.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <Card className="border-2 h-full text-center">
                  <CardContent className="pt-8 pb-8">
                    {/* Step Number */}
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-xl">{step.number}</span>
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="flex justify-center mb-6 mt-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <Icon className="w-8 h-8 text-blue-600" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Connector Line (hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-200 to-purple-200 transform -translate-y-1/2 z-0">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-purple-200 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

