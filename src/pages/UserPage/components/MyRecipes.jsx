import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../redux/user/operations';
import UserPageTabs from '../../../components/UserPageTabs/UserPageTabs';
import UserRecipeRow from '../../../components/UserRecipeRow/UserRecipeRow';
import { selectIsLoggedIn, selectToken } from '../../../redux/auth/selectors';
import Loader from '../../../components/Loader/Loader';
const selectAuthUserId = state => state?.auth?.user?.id;
import { fetchMyRecipes, fetchUserRecipes, deleteMyRecipe } from '../../../api/recipes';
const PAGE_SIZE = 10;
export default function MyRecipes() {
  const navigate = useNavigate();
  const { id: routeId } = useParams();
  const location = useLocation();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const authUserId = useSelector(selectAuthUserId);

  const isOwnProfile =
    (routeId === 'me' && isLoggedIn) || (!!authUserId && String(authUserId) === String(routeId));

  const [page, setPage] = useState(1);

  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const normalize = r => ({
    id: r.id,
    title: r.title,
    description:
      r.description ?? (typeof r.instructions === 'string' ? r.instructions.slice(0, 200) : ''),
    thumb: r.thumb || r.preview || r.img || '/images/placeholder.png',
  });
  // Fetch recipes (own vs other)
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setErr('');
        let payload;
        if (isOwnProfile) {
          if (!token) {
            if (!cancelled) {
              setItems([]);
              setTotalPages(1);
            }
            return;
          }
          payload = await fetchMyRecipes(token, { page, limit: PAGE_SIZE });
        } else {
          const targetUserId = routeId === 'me' ? authUserId : routeId;
          if (!targetUserId) {
            if (!cancelled) {
              setItems([]);
              setTotalPages(1);
            }
            return;
          }
          payload = await fetchUserRecipes(token, targetUserId, { page, limit: PAGE_SIZE });
        }
        const list = Array.isArray(payload?.recipes) ? payload.recipes : [];
        const normalized = list.map(normalize);
        if (!cancelled) {
          setItems(normalized);
          setTotalPages(typeof payload?.totalPages === 'number' ? payload.totalPages : 1);
        }
      } catch (e) {
        if (!cancelled) {
          setErr(e?.message || 'Failed to load recipes');
          setItems([]);
          setTotalPages(1);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [isOwnProfile, routeId, authUserId, token, page]);
  useEffect(() => {
    setPage(1);
  }, [location.pathname]);
  const hasItems = items.length > 0;
  const handleOpen = id => {
    navigate(`/recipe/${id}`);
  };
  const handleDelete = async id => {
    if (!isOwnProfile) return;
    const sure = window.confirm('Delete this recipe permanently?');
    if (!sure) return;
    try {
      setDeletingId(id);
      await deleteMyRecipe(token, id);
      setItems(prev => prev.filter(r => r.id !== id));
      const targetUserId = routeId === 'me' ? authUserId : routeId;
      dispatch(getUser({ id: targetUserId, token }));
      if (items.length === 1 && page > 1) {
        setPage(p => p - 1);
      }
    } catch (e) {
      alert(e?.response?.data?.message || e?.message || 'Failed to delete recipe');
    } finally {
      setDeletingId(null);
    }
  };
  const emptyMessage = useMemo(() => {
    if (isOwnProfile) {
      return 'Nothing has been added to your recipes list yet. Please browse our recipes and add your favorites for easy access in the future.';
    }
    return "This user hasn't added any recipes yet.";
  }, [isOwnProfile]);

  if (loading) {
    return <Loader />;
  }

  return (
    <UserPageTabs
      currentPage={page}
      totalPages={totalPages}
      onPageChange={setPage}
      isLoading={loading}
    >
      {err && <p style={{ color: 'var(--red)' }}>{err}</p>}
      {hasItems ? (
        <div style={{ display: 'grid', gap: 32 }}>
          {items.map(r => (
            <UserRecipeRow
              key={r.id}
              id={r.id}
              title={r.title}
              description={r.description}
              thumb={r.thumb}
              onOpen={handleOpen}
              onDelete={isOwnProfile ? handleDelete : undefined}
              isDeleting={deletingId === r.id}
            />
          ))}
        </div>
      ) : (
        !loading && <p style={{color: "#1A1A1A"}}>{emptyMessage}</p>
      )}
    </UserPageTabs>
  );
}
