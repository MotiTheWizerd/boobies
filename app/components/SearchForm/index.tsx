import React from "react";

const SearchForm = () => {
  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4 text-purple-800">חיפוש מהיר</h2>

      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              שם
            </label>
            <input
              type="text"
              className="search-input"
              placeholder="הזן שם..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              גיל
            </label>
            <div className="flex gap-2">
              <select className="dropdown-select flex-1">
                <option value="">מ</option>
                {[...Array(43)].map((_, i) => (
                  <option key={`min-${i + 18}`} value={i + 18}>
                    {i + 18}
                  </option>
                ))}
              </select>

              <select className="dropdown-select flex-1">
                <option value="">עד</option>
                {[...Array(43)].map((_, i) => (
                  <option key={`max-${i + 18}`} value={i + 18}>
                    {i + 18}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              אזור
            </label>
            <select className="dropdown-select">
              <option value="">- הכל -</option>
              <option value="מרכז">מרכז</option>
              <option value="דרום">דרום</option>
              <option value="צפון">צפון</option>
              <option value="שרון">שרון</option>
              <option value="ירושלים">ירושלים</option>
              <option value="אזור אחר">אזור אחר</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              עיר
            </label>
            <select className="dropdown-select">
              <option value="">- הכל -</option>
              {/* Cities would be populated dynamically */}
              <option value="תל אביב">תל אביב</option>
              <option value="ירושלים">ירושלים</option>
              <option value="חיפה">חיפה</option>
              <option value="באר שבע">באר שבע</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              30 דק בדירה
            </label>
            <div className="flex gap-2">
              <select className="dropdown-select flex-1">
                <option value="">הכל</option>
                {/* Price options would go here */}
                <option value="300">₪300</option>
                <option value="400">₪400</option>
                <option value="500">₪500</option>
              </select>

              <select className="dropdown-select flex-1">
                <option value="">₪</option>
                {/* Price options would go here */}
                <option value="300">₪300</option>
                <option value="400">₪400</option>
                <option value="500">₪500</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              שעה בדירה
            </label>
            <div className="flex gap-2">
              <select className="dropdown-select flex-1">
                <option value="">הכל</option>
                {/* Price options would go here */}
                <option value="500">₪500</option>
                <option value="600">₪600</option>
                <option value="700">₪700</option>
              </select>

              <select className="dropdown-select flex-1">
                <option value="">₪</option>
                {/* Price options would go here */}
                <option value="500">₪500</option>
                <option value="600">₪600</option>
                <option value="700">₪700</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              שעה במלון
            </label>
            <div className="flex gap-2">
              <select className="dropdown-select flex-1">
                <option value="">הכל</option>
                {/* Price options would go here */}
                <option value="700">₪700</option>
                <option value="800">₪800</option>
                <option value="900">₪900</option>
              </select>

              <select className="dropdown-select flex-1">
                <option value="">₪</option>
                {/* Price options would go here */}
                <option value="700">₪700</option>
                <option value="800">₪800</option>
                <option value="900">₪900</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              מספר טלפון
            </label>
            <div className="flex gap-2">
              <select className="dropdown-select w-28">
                <option value="+972">+972</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                {/* Other country codes would go here */}
              </select>

              <input
                type="tel"
                className="search-input flex-1"
                placeholder="הזן מספר טלפון..."
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-4">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="withPhoto" className="h-4 w-4" />
            <label htmlFor="withPhoto" className="text-sm">
              עם תמונה בלבד
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="withVideo" className="h-4 w-4" />
            <label htmlFor="withVideo" className="text-sm">
              עם וידאו בלבד
            </label>
          </div>
        </div>

        <div className="mt-2 flex gap-4">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="verified" className="h-4 w-4" />
            <label htmlFor="verified" className="text-sm">
              מאומת בלבד
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="withReviews" className="h-4 w-4" />
            <label htmlFor="withReviews" className="text-sm">
              עם ביקורות בלבד
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition"
        >
          חיפוש
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
