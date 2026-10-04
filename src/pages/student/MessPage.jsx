import React, { useState } from 'react';
import {
  UtensilsCrossed,
  Coffee,
  Sun,
  Sunset,
  Moon,
  Star,
  Send,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Clock,
  ThumbsUp,
  MessageSquare
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';
import { messMenu } from '../../data/mockData';
import RatingStars from '../../components/ui/RatingStars';
import StatusBadge from '../../components/common/StatusBadge';

export const MessPage = () => {
  const { studentProfile, requests, addRequest, showToast, messRatings, addMessRating } = useCampus();

  const [selectedMeal, setSelectedMeal] = useState('lunch');
  const [ratingVal, setRatingVal] = useState(5);
  const [ratingComment, setRatingComment] = useState('');
  const [ratingMealType, setRatingMealType] = useState('Lunch');

  // Mess complaint form
  const [complaintCategory, setComplaintCategory] = useState('Food Quality');
  const [complaintMeal, setComplaintMeal] = useState('Today Lunch');
  const [complaintDesc, setComplaintDesc] = useState('');
  const [isSubmittingComplaint, setIsSubmittingComplaint] = useState(false);

  // Filter mess complaints for student
  const messComplaints = requests.filter(
    (r) =>
      r.requestType === 'Mess Complaint' &&
      (r.studentId === studentProfile.studentId || r.studentName === studentProfile.name)
  );

  const mealCards = [
    {
      key: 'breakfast',
      title: 'Breakfast',
      time: messMenu.today.breakfast.timing,
      calories: messMenu.today.breakfast.calories,
      icon: Coffee,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      items: messMenu.today.breakfast.items
    },
    {
      key: 'lunch',
      title: 'Lunch',
      time: messMenu.today.lunch.timing,
      calories: messMenu.today.lunch.calories,
      icon: Sun,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      items: messMenu.today.lunch.items
    },
    {
      key: 'snacks',
      title: 'Evening Snacks',
      time: messMenu.today.snacks.timing,
      calories: messMenu.today.snacks.calories,
      icon: Sunset,
      color: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      items: messMenu.today.snacks.items
    },
    {
      key: 'dinner',
      title: 'Special Dinner',
      time: messMenu.today.dinner.timing,
      calories: messMenu.today.dinner.calories,
      icon: Moon,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      items: messMenu.today.dinner.items
    }
  ];

  const handleRatingSubmit = (e) => {
    e.preventDefault();
    addMessRating(ratingVal, ratingMealType, ratingComment || 'Good meal quality.');
    setRatingComment('');
  };

  const handleComplaintSubmit = (e) => {
    e.preventDefault();
    if (!complaintDesc.trim()) {
      showToast('Please describe the mess grievance', 'warning');
      return;
    }

    setIsSubmittingComplaint(true);
    setTimeout(() => {
      const complaintId = `MC-${Math.floor(400 + Math.random() * 100)}`;
      addRequest({
        id: complaintId,
        requestType: 'Mess Complaint',
        category: complaintCategory,
        meal: complaintMeal,
        priority: 'Medium',
        status: 'Pending',
        description: complaintDesc,
        assignedTo: 'Mess Warden & Catering Committee',
        department: 'Mess & Food Safety Cell',
        adminComment: 'Reported to Head Caterer for inspection.'
      });

      setComplaintDesc('');
      setIsSubmittingComplaint(false);
    }, 400);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Mess Services & Daily Dining
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Wednesday, 20 September 2026 • Central Dining Hall (Block C & D)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>FSSAI Hygiene Certified ★★★★★</span>
          </span>
        </div>
      </div>

      {/* 4 Meals Menu Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-900">Today's Meal Schedule</h3>
          <span className="text-xs text-slate-400 font-medium">Vegetarian & Non-Veg Counters Active</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {mealCards.map((meal) => {
            const Icon = meal.icon;
            return (
              <div
                key={meal.key}
                className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl ${meal.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold text-sm text-slate-900">{meal.title}</h4>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2.5 mb-3 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-indigo-500" /> {meal.time}
                    </span>
                    <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                      {meal.calories}
                    </span>
                  </div>

                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {meal.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-600">Served Fresh</span>
                  <button
                    onClick={() => {
                      setRatingMealType(meal.title);
                      showToast(`Rating selected for ${meal.title}`, 'info');
                    }}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                  >
                    Rate this meal →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Split section: Interactive Feedback & Report Issue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Rate Today's Meal Widget */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">Rate Today's Meal</h3>
                  <p className="text-xs text-slate-400">Your feedback shapes next week's meal menu</p>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                4.2 Campus Avg
              </span>
            </div>

            <form onSubmit={handleRatingSubmit} className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-700 uppercase tracking-wider">
                  Select Meal Session
                </label>
                <select
                  value={ratingMealType}
                  onChange={(e) => setRatingMealType(e.target.value)}
                  className="p-1.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800"
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Snacks">Evening Snacks</option>
                  <option value="Dinner">Dinner</option>
                </select>
              </div>

              <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-xs font-semibold text-slate-500 mb-2">
                  How satisfied were you with the taste, freshness, and hygiene?
                </span>
                <RatingStars rating={ratingVal} onRate={(r) => setRatingVal(r)} size="lg" />
                <span className="text-xs font-bold text-slate-800 mt-2">
                  {ratingVal === 5 ? 'Excellent ★★★★★' : ratingVal >= 4 ? 'Good ★★★★' : 'Needs Improvement'}
                </span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Comments or Suggestions (Optional)
                </label>
                <input
                  type="text"
                  value={ratingComment}
                  onChange={(e) => setRatingComment(e.target.value)}
                  placeholder="e.g. Paneer gravy was fantastic, need more hot tea..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 font-medium text-slate-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Meal Feedback</span>
              </button>
            </form>
          </div>

          {/* Recent feedback preview */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Recent Student Reviews
            </span>
            <div className="space-y-2">
              {messRatings.slice(0, 2).map((r) => (
                <div key={r.id} className="p-2.5 rounded-xl bg-slate-50 text-xs flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-800">{r.user} ({r.meal}): </span>
                    <span className="text-slate-600">"{r.comment}"</span>
                  </div>
                  <span className="text-amber-500 font-bold ml-2">{'★'.repeat(r.rating)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Report Mess Issue Form */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100 mb-5">
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">Report Mess Grievance</h3>
                <p className="text-xs text-slate-400">Hygiene, undercooked food, or catering issues</p>
              </div>
            </div>

            <form onSubmit={handleComplaintSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <select
                    value={complaintCategory}
                    onChange={(e) => setComplaintCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-100 font-medium text-slate-800"
                  >
                    <option value="Food Quality">Food Quality & Taste</option>
                    <option value="Hygiene">Hygiene & Cleanliness</option>
                    <option value="Menu Variety">Menu Discrepancy</option>
                    <option value="Timing">Serving Timing Delay</option>
                    <option value="Staff Behavior">Catering Staff</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Impacted Meal
                  </label>
                  <input
                    type="text"
                    value={complaintMeal}
                    onChange={(e) => setComplaintMeal(e.target.value)}
                    placeholder="e.g. Wednesday Lunch"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-100 font-medium text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Detailed Description of Issue
                </label>
                <textarea
                  rows={4}
                  required
                  value={complaintDesc}
                  onChange={(e) => setComplaintDesc(e.target.value)}
                  placeholder="Explain what was wrong so the mess committee can take corrective action..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-100 font-medium text-slate-800"
                />
              </div>

              <div className="p-3 bg-rose-50/60 rounded-xl text-rose-800 text-[11px]">
                <span className="font-bold">Prompt Notice:</span> Issues involving food hygiene or foreign objects
                are flagged with maximum urgency directly to the Dean of Student Welfare.
              </div>

              <button
                type="submit"
                disabled={isSubmittingComplaint}
                className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-md shadow-rose-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmittingComplaint ? 'Dispatching...' : 'File Official Mess Complaint'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Submitted Complaints Status Section */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <h3 className="font-bold text-base text-slate-900">Your Submitted Mess Complaints</h3>
          <span className="text-xs text-slate-500 font-semibold">{messComplaints.length} tickets</span>
        </div>

        {messComplaints.length === 0 ? (
          <p className="text-xs text-slate-400 py-4 text-center">No open mess complaints currently on file.</p>
        ) : (
          <div className="space-y-3">
            {messComplaints.map((comp) => (
              <div
                key={comp.id}
                className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">#{comp.id} - {comp.category}</span>
                    <span className="text-[10px] text-slate-400">({comp.meal || 'Dining Hall'})</span>
                    <StatusBadge status={comp.status} />
                  </div>
                  <p className="text-slate-600 mt-1">{comp.description}</p>
                </div>

                <div className="text-right sm:text-right shrink-0">
                  <span className="text-[11px] text-slate-400 block">{comp.date}</span>
                  {comp.adminComment && (
                    <span className="text-[11px] text-indigo-600 font-semibold mt-0.5 block">
                      Remark: {comp.adminComment}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default MessPage;
