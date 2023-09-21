const Loading = ({ color = 'red', size = '16' }) => (
  <div class="flex items-center justify-center space-x-1 w-full">
	  <div class="w-4 h-4 bg-violet-600 dark:bg-violet-400 rounded-full animate-pulse"></div>
	  <div class="w-4 h-4 bg-violet-600 dark:bg-violet-400 rounded-full animate-pulse"></div>
	  <div class="w-4 h-4 bg-violet-600 dark:bg-violet-400 rounded-full animate-pulse"></div>
  </div>
);

export default Loading;
