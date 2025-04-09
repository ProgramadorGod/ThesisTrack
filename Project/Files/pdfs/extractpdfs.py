import requests
import json
import os
import time
from concurrent.futures import ThreadPoolExecutor
import re

documentos_faltantes = [286, 289, 292, 294, 301, 303, 398, 674, 839, 1717, 1772, 1782, 1783, 1784, 1785, 1786, 1787, 1788, 1789, 1790, 1791, 1792, 1793, 1794, 1795, 1796, 1797, 1798, 1799, 1800, 1801, 1802, 1803, 1804, 1805, 1806, 1807, 1808, 1809, 1810, 1811, 1812, 1813, 1814, 1815, 1816, 1817, 1818, 1819, 1820, 1821, 1822, 1823, 1824, 1825, 1826, 1827, 1828, 1829, 1830, 1831, 1832, 1833, 1834, 1835, 1836, 1837, 1838, 1839, 1840, 1841, 1842, 1843, 1844, 1845, 1846, 1847, 1848, 1849, 1850, 1851, 1852, 1853, 1854, 1855, 1856, 1857, 1858, 1859, 1860, 1861, 1862, 1863, 1864, 1865, 1866, 1867, 1868, 2068, 2274, 2329, 2330, 2331, 2332, 2333, 2334, 2335, 2339, 2340, 2341, 2342, 2343, 2344, 2345, 2346, 2347, 2348, 2349, 2350, 2351, 2352, 2353, 2354, 2355, 2356, 2357, 2358, 2359, 2360, 2361, 2362, 2363, 2364, 2365, 2366, 2367, 2368, 2369, 2370, 2371, 2372, 2373, 2374, 2375, 2376, 2377, 2378, 2379, 2380, 2381, 2382, 2383, 2384, 2385, 2386, 2387, 2388, 2389, 2390, 2391, 2392, 2393, 2394, 2395, 2396, 2397, 2398, 2399, 2400, 2401, 2402, 2403, 2404, 2405, 2406, 2407, 2408, 2409, 2410, 2411, 2412, 2413, 2414, 2415, 2416, 2417, 2418, 2419, 2420, 2421, 2422, 2423, 2424, 2425, 2426, 2427, 2428, 2429, 2430, 2431, 2432, 2433, 2434, 2435, 2436, 2437, 2438, 2439, 2440, 2441, 2442, 2443, 2444, 2445, 2446, 2447, 2448, 2449, 2450, 2451, 2452, 2453, 2454, 2455, 2456, 2457, 2458, 2459, 2460, 2461, 2462, 2463, 2464, 2465, 2466, 2467, 2468, 2469, 2470, 2471, 2472, 2473, 2474, 2475, 2476, 2477, 2478, 2479, 2480, 2481, 2482, 2483, 2484, 2485, 2486, 2487, 2488, 2489, 2490, 2491, 2492, 2493, 2494, 2495, 2496, 2497, 2498, 2499, 2500, 2501, 2502, 2503, 2504, 2619, 2620, 2638, 2641, 2642, 2643, 2644, 2645, 2646, 2647, 2648, 2649, 2650, 2651, 2652, 2653, 2654, 2655, 2656, 2657, 2658, 2659, 2660, 2661, 2662, 2663, 2664, 2665, 2666, 2667, 2668, 2669, 2670, 2671, 2672, 2673, 2674, 2675, 2676, 2677, 2678, 2679, 2680, 2681, 2682, 2683, 2684, 2685, 2686, 2687, 2688, 2689, 2690, 2691, 2692, 2693, 2694, 2695, 2696, 2697, 2698, 2699, 2700, 2701, 2702, 2703, 2704, 2705, 2706, 2707, 2708, 2709, 2710, 2711, 2712, 2713, 2714, 2715, 2716, 2717, 2718, 2719, 2720, 2721, 2722, 2723, 2724, 2725, 2726, 2727, 2728, 2729, 2730, 2731, 2732, 2733, 2734, 2735, 2736, 2737, 2738, 2739, 2740, 2741, 2742, 2743, 2744, 2745, 2746, 2747, 2748, 2749, 2750, 2751, 2752, 2753, 2754, 2755, 2756, 2757, 2758, 2759, 2760, 2761, 2762, 2763, 2764, 2765, 2766, 2767, 2768, 2769, 2770, 2771, 2772, 2773, 2774, 2775, 2776, 2777, 2778, 2779, 2780, 2781, 2782, 2783, 2784, 2785, 2786, 2787, 2788, 2789, 2790, 2791, 2792, 2793, 2794, 2795, 2796, 2797, 2798, 2799, 2800, 2801, 2802, 2803, 2804, 2805, 2806, 2807, 2808, 2809, 2810, 2811, 2812, 2813, 2814, 2815, 2816, 2817, 2818, 2819, 2820, 2821, 2822, 2823, 2824, 2825, 2826, 2827, 2828, 2829, 2830, 2831, 2832, 2833, 2834, 2835, 2836, 2837, 2838, 2839, 2840, 2841, 2842, 2843, 2844, 2845, 2846, 2847, 2848, 2849, 2850, 2851, 2852, 2853, 2854, 2855, 2856, 2857, 2858, 2859, 2860, 2861, 2862, 2863, 2864, 2865, 2866, 2867, 2868, 2869, 2870, 2871, 2872, 2873, 2874, 2875, 2876, 2877, 2878, 2879, 2880, 2881, 2882, 2883, 2884, 2885, 2886, 2887, 2888, 2889, 2890, 2891, 2892, 2893, 2894, 2895, 2896, 2897, 2898, 2899, 2900, 2901, 2902, 2903, 2904, 2905, 2906, 2907, 2908, 2909, 2910, 2911, 2912, 2913, 2914, 2915, 2916, 2917, 2918, 2919, 2920, 2921, 2922, 2923, 2924, 2925, 2926, 2927, 2928, 2929, 2930, 2931, 2932, 2933, 2934, 2935, 2936, 2937, 2938, 2939, 2940, 2941, 2942, 2943, 2944, 2945, 2946, 2947, 2948, 2949, 2950, 2951, 2952, 2953, 2954, 2955, 2956, 2957, 2958, 2959, 2960, 2961, 2962, 2963, 2964, 2965, 2966, 2967, 2968, 2969, 2970, 2971, 2972, 2973, 2974, 2975, 2976, 2977, 2978, 2979, 2980, 2981, 2982, 2983, 2984, 2985, 2986, 2987, 2988, 2989, 2990, 2991, 2992, 2993, 2994, 2995, 2996, 2997, 2998, 2999, 3000, 3001, 3002, 3003, 3004, 3005, 3006, 3007, 3008, 3009, 3010, 3011, 3012, 3013, 3014, 3015, 3016, 3017, 3018, 3019, 3020, 3021, 3022, 3023, 3024, 3025, 3026, 3027, 3028, 3029, 3030, 3031, 3032, 3033, 3034, 3035, 3036, 3037, 3038, 3039, 3040, 3041, 3042, 3043, 3044, 3045, 3046, 3047, 3048, 3049, 3050, 3051, 3052, 3053, 3054, 3055, 3056, 3057, 3058, 3059, 3060, 3061, 3062, 3063, 3064, 3065, 3066, 3067, 3068, 3069, 3070, 3071, 3072, 3073, 3074, 3075, 3076, 3077, 3078, 3079, 3080, 3081, 3082, 3083, 3084, 3085, 3086, 3087, 3088, 3089, 3090, 3091, 3092, 3093, 3094, 3095, 3096, 3097, 3098, 3099, 3100, 3101, 3102, 3103, 3104, 3105, 3106, 3107, 3108, 3109, 3110, 3111, 3112, 3113, 3114, 3115, 3116, 3117, 3118, 3119, 3120, 3121, 3122, 3123, 3124, 3125, 3126, 3127, 3128, 3129, 3130, 3133, 3189, 3211, 3404, 3405, 3423, 3493, 3494, 3515, 3547, 3603, 3852, 3907]

# Función para obtener el ID del archivo desde la URL de Google Drive
def extract_drive_id(url):
    if "/file/d/" in url:
        start_idx = url.find("/file/d/") + len("/file/d/")
        end_idx = url.find("/view")
        return url[start_idx:end_idx]
    return None

# Función para construir el enlace de descarga directa usando el ID de Google Drive
def get_direct_download_link(file_id):
    return f"https://drive.google.com/uc?export=download&id={file_id}"

# Función para descargar el PDF desde la URL
def download_pdf(url, destination, retries=3):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            with open(destination, 'wb') as f:
                f.write(response.content)
            print(f"Archivo {destination} descargado correctamente.")
        else:
            raise Exception(f"Error {response.status_code}")
    except Exception as e:
        if retries > 0:
            print(f"Error al descargar {destination}: {e}. Reintentando...")
            time.sleep(5)
            download_pdf(url, destination, retries - 1)
        else:
            print(f"Descarga fallida después de varios intentos: {destination}")

# Obtener el último número de archivo descargado
def get_highest_downloaded_number():
    highest_number = 0
    pattern = re.compile(r'documento_(\d+)\.pdf')
    for filename in os.listdir(pdf_folder):
        match = pattern.match(filename)
        if match:
            file_number = int(match.group(1))
            if file_number > highest_number:
                highest_number = file_number
    return highest_number

# Función que maneja la descarga de un grupo de URLs
def download_group(urls, start_index):
    for i, url in enumerate(urls):
        file_id = extract_drive_id(url)
        if file_id:
            download_url = get_direct_download_link(file_id)
            destination = os.path.join(pdf_folder, f'documento_{start_index + i + 1}.pdf')
            
            if destination not in downloaded_files:
                download_pdf(download_url, destination)
                downloaded_files.append(destination)
                
                # Guardar progreso en el archivo de log
                with open('downloaded_files.json', 'w') as json_file:
                    json.dump(downloaded_files, json_file)
                
                time.sleep(2)
            else:
                print(f"{destination} ya ha sido descargado previamente.")
        else:
            print(f"No se pudo extraer el ID de la URL: {url}")
            failed_files.append(url)

# Cargar las URLs desde el archivo JSON
with open('urls.json', 'r') as json_file:
    urls = json.load(json_file)

# Registro de archivos descargados y fallidos
downloaded_files = []
failed_files = []
if os.path.exists('downloaded_files.json'):
    with open('downloaded_files.json', 'r') as json_file:
        downloaded_files = json.load(json_file)

# Crear carpeta para almacenar los PDFs
pdf_folder = "pdfs"
os.makedirs(pdf_folder, exist_ok=True)

# Obtener el índice de inicio basado en el último archivo descargado
last_downloaded_number = get_highest_downloaded_number()

# Filtrar URLs que aún no han sido descargadas
remaining_urls = urls[last_downloaded_number:]

# Dividir las URLs en lotes y usar 5 hilos
num_threads = 5
chunk_size = len(remaining_urls) // num_threads if len(remaining_urls) > num_threads else 1

# Crear un ThreadPoolExecutor con 5 hilos
with ThreadPoolExecutor(max_workers=num_threads) as executor:
    futures = []
    for i in range(0, len(remaining_urls), chunk_size):
        urls_chunk = remaining_urls[i:i+chunk_size]
        start_index = last_downloaded_number + i
        futures.append(executor.submit(download_group, urls_chunk, start_index))

# Guardar URLs fallidas para reintentar después
if failed_files:
    with open('failed_files.json', 'w') as json_file:
        json.dump(failed_files, json_file)
    print(f"Descargas fallidas guardadas en failed_files.json")
