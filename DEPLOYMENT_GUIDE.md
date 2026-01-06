# CORS & Deployment Troubleshooting Guide

## Issues Found & Fixed

### 1. ✅ CORS Configuration Issues
**Problem:** Trailing slashes in CORS origins
- `https://shubh-varshney.vercel.app/` ❌
- `https://shubhvarshney.netlify.app/` ❌

**Fixed:** Removed trailing slashes
- `https://shubh-varshney.vercel.app` ✅
- `https://shubhvarshney.netlify.app` ✅

**Additional improvements:**
- Added explicit HTTP methods: `['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']`
- Added allowed headers: `['Content-Type', 'Authorization']`

### 2. ✅ Missing Vercel Configuration
**Problem:** No `vercel.json` file in the server directory

**Fixed:** Created `server/vercel.json` with proper routing configuration

### 3. Backend API Endpoints
**Current Configuration:**
- GitHub Stats: `https://shubh-varshney-backend.vercel.app/api/github/:username`
- LeetCode Stats: `https://shubh-varshney-backend.vercel.app/api/leetcode/:username`
- Health Check: `https://shubh-varshney-backend.vercel.app/api/health`

## Deployment Checklist

### Backend (Vercel)
- [ ] Push the updated `server/src/index.ts` with fixed CORS
- [ ] Push the new `server/vercel.json` file
- [ ] Verify deployment at: https://shubh-varshney-backend.vercel.app/api/health
- [ ] Test GitHub API: https://shubh-varshney-backend.vercel.app/api/github/brainRottedCoder
- [ ] Test LeetCode API: https://shubh-varshney-backend.vercel.app/api/leetcode/Shubh_Varshney

### Frontend (Vercel/Netlify)
- [ ] Verify API_BASE URLs are correct in:
  - `src/hooks/useGitHubStats.ts`
  - `src/hooks/useLeetCodeStats.ts`
- [ ] Build and deploy frontend
- [ ] Test on production URL

## Testing Commands

### Test Backend Health
```bash
curl https://shubh-varshney-backend.vercel.app/api/health
```

### Test GitHub API
```bash
curl https://shubh-varshney-backend.vercel.app/api/github/brainRottedCoder
```

### Test LeetCode API
```bash
curl https://shubh-varshney-backend.vercel.app/api/leetcode/Shubh_Varshney
```

### Test CORS from Frontend
Open browser console on your deployed site and check for CORS errors in Network tab.

## Common Issues & Solutions

### Issue: "CORS policy: No 'Access-Control-Allow-Origin' header"
**Solution:** 
- Ensure backend CORS origins match EXACTLY (no trailing slashes)
- Redeploy backend after CORS changes

### Issue: "Failed to fetch"
**Solution:**
- Check if backend is deployed and running
- Verify API_BASE URL is correct
- Check Vercel logs for backend errors

### Issue: "404 Not Found"
**Solution:**
- Verify `vercel.json` routes are correct
- Ensure API endpoints match between frontend and backend

### Issue: GitHub/LeetCode stats not loading
**Solution:**
- Check browser console for errors
- Verify usernames are correct
- Test API endpoints directly with curl

## Next Steps

1. **Commit and push the changes:**
   ```bash
   cd server
   git add .
   git commit -m "fix: CORS configuration and add Vercel config"
   git push
   ```

2. **Redeploy backend on Vercel**
   - Vercel should auto-deploy on push
   - Or manually trigger deployment from Vercel dashboard

3. **Test the deployed backend**
   - Visit health endpoint
   - Test API endpoints with curl or browser

4. **Deploy frontend**
   - Frontend should work once backend is properly deployed

5. **Monitor for errors**
   - Check Vercel logs for backend
   - Check browser console for frontend
