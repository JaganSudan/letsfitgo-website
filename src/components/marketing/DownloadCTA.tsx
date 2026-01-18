import AppStoreButtons from '@/components/AppStoreButtons';

export default function DownloadCTA() {
  return (
    <section id="download" className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
          Download Let&apos;s Fit Go today and start your fitness journey with friends.
        </p>
        <p className="text-lg text-gray-500 mb-8">
          Available on iOS and Android
        </p>
        
        <div className="flex justify-center mb-12">
          <AppStoreButtons />
        </div>

        <div className="pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Join thousands of users already achieving their fitness goals
          </p>
        </div>
      </div>
    </section>
  );
}








